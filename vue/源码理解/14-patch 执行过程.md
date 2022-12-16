# 为什么需要 patch

- 1.x 版本 Vue 没有 VNode 和 diff 算法，版本的核心只有响应式原理：defineProperty、Dep、Watcher

  每遇到一个插值表达式就会新建一个 watcher，这样每个节点就会对应一个 watcher。

  每一个 key 都新建一个 Dep，这样每个 key 就会对应一个 Dep。

  虽然更新效率高，但是页面会产生大量的 watcher，这非常耗资源。


- 2.x 版本 通过引入 VNode 和 diff 算法去解决 1.x 中的问题。

  传入的也不再是一个插值表达式，而是由当前组件的模板转化而来的渲染函数，变成一个组件一个 watcher（就是我们说的渲染 watcher），这就解决了复杂页面 watcher 太多导致性能下降的问题。

  当组件中数据更新时，会为组件生成一个新的 VNode，通过比对新老两个 VNode，找出不一样的地方（也就是找出需要更新的插值表达式），然后执行 DOM 操作更新发生变化的节点，这个过程就是 diff。




# patch 入口

页面首次渲染和后续更新的入口位置

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this

  // 页面的挂载点，真实的元素
  const prevEl = vm.$el

  // 老 VNode
  const prevVnode = vm._vnode
  const restoreActiveInstance = setActiveInstance(vm)

  // 新 VNode
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // 老 VNode 不存在，表示首次渲染，即初始化页面时走这里
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // 响应式数据更新时，即更新页面时走这里
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  restoreActiveInstance()
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
}
```

```js
// 在 Vue 原型链上安装 web 平台的 patch 函数
Vue.prototype.__patch__ = inBrowser ? patch : noop

// patch 工厂函数，为其传入平台特有的一些操作，然后返回一个 patch 函数
export const patch: Function = createPatchFunction({ nodeOps, modules })
```

# createPatchFunction

```js
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

/**
 * 工厂函数，注入平台特有的一些功能操作，并定义一些方法，然后返回 patch 函数
 */
export function createPatchFunction (backend) {
  let i, j
  const cbs = {}

  /**
   * modules: { ref, directives, 平台特有的一些操纵，比如 attr、class、style 等 }
   * nodeOps: { 对元素的增删改查 API }
   */
  const { modules, nodeOps } = backend

  /**
   * hooks = ['create', 'activate', 'update', 'remove', 'destroy']
   * 遍历这些钩子，然后从 modules 的各个模块中找到相应的方法，比如：directives 中的 create、update、destroy 方法
   * 让这些方法放到 cb[hook] = [hook 方法] 中，比如: cb.create = [fn1, fn2, ...]
   * 然后在合适的时间调用相应的钩子方法完成对应的操作
   */
  for (i = 0; i < hooks.length; ++i) {
    // 比如 cbs.create = []
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        // 遍历各个 modules，找出各个 module 中的 create 方法，然后添加到 cbs.create 数组中
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
  
  return patch
}
```

# patch

核心执行：createElm 去创建真实dom

```js
/**
 * vm.__patch__
 *   1、新节点不存在，老节点存在，调用 destroy，销毁老节点
 *   2、如果 oldVnode 是真实元素，则表示首次渲染，创建新节点，并插入 body，然后移除老节点
 *   3、如果 oldVnode 不是真实元素，则表示更新阶段，执行 patchVnode
 */
function patch(oldVnode, vnode, hydrating, removeOnly) {
  
  // 如果新节点不存在，老节点存在，则调用 destroy，销毁老节点
  if (isUndef(vnode)) {
    if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
    return
  }

  let isInitialPatch = false
  const insertedVnodeQueue = []

  // 老的 VNode 不存在，新的 VNode 存在，这种情况是一个组件初次渲染的时候
  if (isUndef(oldVnode)) {
    
    isInitialPatch = true
    // 直接去创建真实dom
    createElm(vnode, insertedVnodeQueue)

  } else {

    // 判断 oldVnode 是否为真实元素
    const isRealElement = isDef(oldVnode.nodeType)
    
    // oldVnode 不是真实元素 && 老节点和新节点是同一个节点
    if (!isRealElement && sameVnode(oldVnode, vnode)) {

      // 则表示更新阶段，执行 patchVnode
      patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    } else {

      // oldVnode 是真实元素，则表示初次渲染
      if (isRealElement) {
        
        // 根据当前的真实节点去创建一个 vnode
        oldVnode = emptyNodeAt(oldVnode)
      }

      // 拿到老节点的真实元素
      const oldElm = oldVnode.elm
      // 获取老节点的父元素，即 body
      const parentElm = nodeOps.parentNode(oldElm)

      // 直接去创建真实dom
      // 基于新 vnode 创建整棵 DOM 树并插入到 body 元素下
      createElm(
        vnode,
        insertedVnodeQueue,
        oldElm._leaveCb ? null : parentElm,
        nodeOps.nextSibling(oldElm)
      )

      // 移除老节点
      if (isDef(parentElm)) {
        removeVnodes([oldVnode], 0, 0)
      } else if (isDef(oldVnode.tag)) {
        invokeDestroyHook(oldVnode)
      }
    }
  }

  invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
  return vnode.elm
}

```


# patchVnode

- 更新节点

- 核心：如果新老节点都有孩子，则递归执行 diff updateChildren

- patchVnode 方法会被递归调用，oldVnode === vnode 是递归的终止条件

- vnode = { tag: 'span', children: 'text content' } 终止后再去判断children

```js
/**
 *   全量的属性更新
 *   如果新老节点都有孩子，则递归执行 diff
 *   如果新节点有孩子，老节点没孩子，则新增新节点的这些孩子节点
 *   如果老节点有孩子，新节点没孩子，则删除老节点的这些孩子
 *   更新文本节点
 */
function patchVnode(
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // 老节点和新节点相同，直接返回
  if (oldVnode === vnode) {
    return
  }

  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode)
  }

  const elm = vnode.elm = oldVnode.elm

  // 异步占位符节点
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
    } else {
      vnode.isAsyncPlaceholder = true
    }
    return
  }

  // 跳过静态节点的更新
  // reuse element for static trees.
  // note we only do this if the vnode is cloned -
  // if the new node is not cloned it means the render functions have been
  // reset by the hot-reload-api and we need to do a proper re-render.
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    // 新旧节点都是静态的而且两个节点的 key 一样，并且新节点被 clone 了 或者 新节点有 v-once指令，则重用这部分节点
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  // 执行组件的 prepatch 钩子
  let i
  const data = vnode.data
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode)
  }

  // 老节点的孩子
  const oldCh = oldVnode.children
  // 新节点的孩子
  const ch = vnode.children
  // 全量更新新节点的属性，Vue 3.0 在这里做了很多的优化
  if (isDef(data) && isPatchable(vnode)) {
    // 执行新节点所有的属性更新
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
  }
  if (isUndef(vnode.text)) {
    // 新节点不是文本节点
    if (isDef(oldCh) && isDef(ch)) {
      // 如果新老节点都有孩子，则递归执行 diff 过程
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {
      // 老孩子不存在，新孩子存在，则创建这些新孩子节点
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch)
      }
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {
      // 老孩子存在，新孩子不存在，则移除这些老孩子节点
      removeVnodes(oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      // 老节点是文本节点，则将文本内容置空
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    // 新节点是文本节点，则更新文本节点
    nodeOps.setTextContent(elm, vnode.text)
  }
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
  }
}

```



# updateChildren

- 核心思想：sameVnode(old, new) 判断新旧两个VNode节点是否相同，相同则执行 patchVnode(old, new) 把旧VNode节点移动到一个全新数组里（下标是新VNode节点的位置），也就是所谓的更新新节点。（深度优先）

- sameVnode 对比的是 新 VNode 的 children 数组，和旧 VNode 的 children 数组

- diff 思路：
    const old = [n1, n2, n3, n4]
    const new = [n1, n2, n3, n4, n5]

  - 对新旧两个VNode节点数组，做了4种假设是否一致，一旦命中假设，就跳过这一次的while循环，降低时间复杂度以提高执行效率
  - 假设是针对前端操作 DOM 的习惯制定的
    1. 旧首 新首对比
    2. 旧尾 新尾对比
    4. 旧首 新尾对比
    3. 旧尾 新首对比

    - 如果不幸没有命中假设，则只能挨个遍历，从老节点中找到新开始节点
    - 如果找到相同节点，则执行 patchVnode，然后将老节点移动到正确的位置

  - 如果老节点先于新节点遍历结束，则剩余的新节点执行新增节点操作
  - 如果新节点先于老节点遍历结束，则剩余的老节点执行删除操作，移除这些老节点

```js
// 里面就是整个 diff 的所有过程
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  // 老节点的开始索引
  let oldStartIdx = 0
  // 新节点的开始索引
  let newStartIdx = 0
  // 老节点的结束索引
  let oldEndIdx = oldCh.length - 1
  // 新节点的结束索引
  let newEndIdx = newCh.length - 1
  // 第一个老节点
  let oldStartVnode = oldCh[0]
  // 第一个新节点
  let newStartVnode = newCh[0]
  // 最后一个老节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 最后一个新节点
  let newEndVnode = newCh[newEndIdx]

  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly是一个特殊的标志，仅由 <transition-group> 使用，以确保被移除的元素在离开转换期间保持在正确的相对位置
  const canMove = !removeOnly

  if (process.env.NODE_ENV !== 'production') {
    // 检查新节点的 key 是否重复
    checkDuplicateKeys(newCh)
  }

  // 遍历新老两组节点
  // 停止条件：新老数组 其中一个遍历完则跳出循环（即开始索引超过结束索引）
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    // 如果老开始节点 不存在
    if (isUndef(oldStartVnode)) {

      // 则老开始节点 下标前进一个（逐渐缩小范围）
      oldStartVnode = oldCh[++oldStartIdx]

      // 如果老结束节点 不存在
    } else if (isUndef(oldEndVnode)) {

      // 则老结束节点 下标前进一个（逐渐缩小范围）
      oldEndVnode = oldCh[--oldEndIdx]
      
    } else if (sameVnode(oldStartVnode, newStartVnode)) {

      // 如果 老开始节点 和 新开始节点是同一个节点，执行 patch
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)

      // patch 结束后 老开始和新开始的索引分别加 1 （逐渐缩小范围）
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]

    } else if (sameVnode(oldEndVnode, newEndVnode)) {

      // 如果 老结束节点 和 新结束节点是同一个节点，执行 patch
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)

      // patch 结束后 老结束和新结束的索引分别减 1 （逐渐缩小范围）
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (sameVnode(oldStartVnode, newEndVnode)) {

      // 如果 老开始节点 和 新结束节点是同一个节点，执行 patch
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)

      // 移动节点（把老开始节点移动到新结束的位置上） 处理被 transtion-group 包裹的组件时使用
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))

      // patch 结束后老开始索引加 1，新结束索引减 1
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (sameVnode(oldEndVnode, newStartVnode)) {

      // 如果 老结束节点 和 新开始节点是同一个节点，执行 patch
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)

      // 移动节点（把老结束节点移动到新开始的位置上）
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)

      // patch 结束后，老结束的索引减 1，新开始的索引加 1
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]

    } else {

      // ！！如果上面的四种假设都不成立，则通过遍历找到 新开始节点 在 老节点中的位置索引

      // createKeyToOldIdx 去构建一个老节点数组的每个节点 key 和 索引之间的关系映射
      // oldKeyToIdx = { key1: idx1, ... }

      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)

      // 然后就可以直接在上面构建的 map映射中找到新开始节点 在 老节点中的位置索引
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)

      // 如果上面的 map映射查找 和 遍历查找都没有找到 新开始节点在老节点的位置
      if (isUndef(idxInOld)) {

        // 则说明是新创建的元素，执行创建
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      
      } else {

        
        vnodeToMove = oldCh[idxInOld]
        // 如果在老节点中找到了新开始节点，并且两个节点是同一个节点
        if (sameVnode(vnodeToMove, newStartVnode)) {

          // 则执行 patch更新节点
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          
          // patch 结束后将该老节点置为 undefined
          // 因为这里的重置，所以下次 while 的一开始才会移动老节点的首尾坐标
          oldCh[idxInOld] = undefined

          // 然后移动老节点到新节点
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {

          // 最后这种情况 比较少见
          // 找到节点了，但是发现两个节点不是同一个节点，则视为新元素，执行创建
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      // 新节点向后移动一个
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 收尾工作
  // 如果 老开始 大于 老结束，说明老节点先被遍历完了，所以剩下的新节点都是新增节点，执行创建插入即可
  if (oldStartIdx > oldEndIdx) {
    // 创建
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    // 插入
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    
  } else if (newStartIdx > newEndIdx) {
    // 如果 新开始 大于 新结束，说明新节点先被遍历完了，所以剩下的老节点都是被删掉的，执行删除即可
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}

```

# sameVnode

- 判读两个节点是否相同

```js

function sameVnode (a, b) {
  return (
    // key 必须相同，需要注意的是 undefined === undefined => true

    // 如果 没有设置key，那么会一直判断相等，然后就会去执行 patchVnode 做没意义的更新
    a.key === b.key && (
      (
        // 标签相同
        a.tag === b.tag &&
        // 都是注释节点
        a.isComment === b.isComment &&
        // 都有 data 属性
        isDef(a.data) === isDef(b.data) &&
        // input 标签的情况
        sameInputType(a, b)
      ) || (
        // 异步占位符节点
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

```