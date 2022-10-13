# 虚拟 DOM 就一定会比直接渲染真实 DOM 快吗

- 场景
如果只有一个dom节点

  - 真实dom
  创建真实dom => 替换

  - 虚拟 dom
  构建虚拟dom对象 => 通过diff算法比对差异 => 创建差异的真实dom => 替换

同样的结果，虚拟dom还要去创建虚拟DOM+DIFF算啊对比 所以说使用虚拟DOM比直接操作真实DOM就一定要快这个说法是错误的，不严谨的。

# 结论

复杂视图情况下可以提升渲染性能，因为虚拟DOM + Diff算法可以精准找到DOM树变更的地方，减少 DOM 的操作(重排重绘)


# 虚拟dom库

- Snabbdom
  - Vue.js2.x内部使用的虚拟DOM就是改造的Snabbdom
  - 大约200SLOC(single line of code)
  - 通过模块可扩展
  - 源码使用TypeScript开发
  - 最快的Virtual DOM之一

- virtual-dom



# Snabbdom 的核心

1. init()设置模块.创建patch()函数

2. 使用h()函数创建JavaScript对象(Vnode)描述真实DOM

3. patch()比较新旧两个Vnode

4. 把变化的内容更新到真实DOM树



- init函数

```js
import {init} from 'snabbdom/build/package/init.js'
import {h} from 'snabbdom/build/package/h.js'

// 1.导入模块
import {styleModule} from "snabbdom/build/package/modules/style";
import {eventListenersModule} from "snabbdom/build/package/modules/eventListeners";

// 2.注册模块
// init是一个高阶函数,一个函数返回另外一个函数,可以缓存modules参数,
// 那么以后直接只传oldValue跟newValue(vnode)就可以了
const patch = init([
  // 样式模块
  styleModule,
  // 事件模块
  eventListenersModule
])

// 3.使用h()函数的第二个参数传入模块中使用的数据(对象)
let vnode = h('div', [
  h('h1', {style: {backgroundColor: 'red'}}, 'Hello world'),
  h('p', {on: {click: eventHandler}}, 'Hello P')
])

function eventHandler() {
  alert('疼,别摸我')
}

const app = document.querySelector('#app')
// 最终通过patch函数对比两个虚拟dom(会先把app转换成虚拟dom),更新视图;
patch(app,vnode)
```


- h函数

用到了ts函数重载 参数个数或参数类型不同的函数()
```js
// h函数
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}
  var children: any
  var text: any
  var i: number
    ...
  return vnode(sel, data, children, text, undefined) //最终返回一个vnode函数
};
```


# pactch() 核心

结果：把新节点中变化的内容渲染到真实DOM,最后返回新节点作为下一次处理的旧节点(核心)

过程：

- 对比新旧VNode是否相同节点，调用sameVnode(key和sel相同)对比

- 如果不是相同节点,删除之前的内容,重新渲染

- 如果是相同节点,再判断新的VNode是否有text,如果有并且和oldVnode的text不同直接更新文本内容(patchVnode核心中的核心)

- 如果新的VNode有children,判断子节点是否有变化(updateChildren,最麻烦,最难实现)

```js
return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {    
    let i: number, elm: Node, parent: Node
    const insertedVnodeQueue: VNodeQueue = []
    // cbs.pre就是所有模块的pre钩子函数集合
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()
    // isVnode函数时判断oldVnode是否是一个虚拟DOM对象
    if (!isVnode(oldVnode)) {
        // 若不是即把Element转换成一个虚拟DOM对象
        oldVnode = emptyNodeAt(oldVnode)
    }
    // sameVnode函数用于判断两个虚拟DOM是否相同节点,源码见补充1;
    if (sameVnode(oldVnode, vnode)) {
        // 相同则运行patchVnode对比两个节点,关于patchVnode后面会重点说明(核心)
        patchVnode(oldVnode, vnode, insertedVnodeQueue)
    } else {
        elm = oldVnode.elm! // !是ts的一种写法代码oldVnode.elm肯定有值
        // parentNode就是获取父元素
        parent = api.parentNode(elm) as Node

        // createElm是用于创建一个dom元素插入到vnode中(新的虚拟DOM)
        createElm(vnode, insertedVnodeQueue)

        if (parent !== null) {
            // 把dom元素插入到父元素中,并且把旧的dom删除
            api.insertBefore(parent, vnode.elm!, api.nextSibling(elm))// 把新创建的元素放在旧的dom后面
            removeVnodes(parent, [oldVnode], 0, 0)
        }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
        insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i])
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
    return vnode
}

// sameVnode函数
function sameVnode(vnode1: VNode, vnode2: VNode): boolean { 通过key和sel选择器判断是否是相同节点
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}


// patchVnode
function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
    const hook = vnode.data?.hook
    hook?.prepatch?.(oldVnode, vnode)
    const elm = vnode.elm = oldVnode.elm!
    const oldCh = oldVnode.children as VNode[]
    const ch = vnode.children as VNode[]
    if (oldVnode === vnode) return
    if (vnode.data !== undefined) {
        for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
        vnode.data.hook?.update?.(oldVnode, vnode)
    }
    if (isUndef(vnode.text)) { // 新节点的text属性是undefined
        if (isDef(oldCh) && isDef(ch)) { // 当新旧节点都存在子节点
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue) //并且他们的子节点不相同执行updateChildren函数,后续会重点说明(核心)
        } else if (isDef(ch)) { // 只有新节点有子节点
            // 当旧节点有text属性就会把''赋予给真实dom的text属性
            if (isDef(oldVnode.text)) api.setTextContent(elm, '') 
            // 并且把新节点的所有子节点插入到真实dom中
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
        } else if (isDef(oldCh)) { // 清除真实dom的所有子节点
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        } else if (isDef(oldVnode.text)) { // 把''赋予给真实dom的text属性
            api.setTextContent(elm, '')
        }
    } else if (oldVnode.text !== vnode.text) { //若旧节点的text与新节点的text不相同
        if (isDef(oldCh)) { // 若旧节点有子节点,就把所有的子节点删除
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        }
        api.setTextContent(elm, vnode.text!) // 把新节点的text赋予给真实dom
    }
    hook?.postpatch?.(oldVnode, vnode) // 更新视图
}
```

# patchVnode 中的 updateChildren比对（核心中的核心）


- 同级别节点比较的五种情况

1. 首个旧节点 与 首个新节点，调用sameVnode(key和sel相同)比对是否相同节点

2. 末个旧节点 与 末个新节点，调用sameVnode(key和sel相同)比对是否相同节点

3. 首个旧节点 与 末个新节点，调用sameVnode(key和sel相同)比对是否相同节点

4. 末个旧节点 与 首个新节点，调用sameVnode(key和sel相同)比对是否相同节点

5. 以上4种都查不到的话就执行第5种情况，去旧节点的每一项找跟新节点一点的节点，直到找到相同节点，然后位移到旧节点的首个，若没有找到在就旧节点首个创建一个新节点

- 整个过程

1. 上述5种是一次循环的执行过程，在每次循环里，只要执行满足了上述的情况的5种之一情况，就会结束这一次循环。

然后执行 patchVnode 找出两者之间的差异，更新视图。

2. 然后 oldEndIdx递增或递减 / newEndIdx递增或递减

3. 直到 oldStartIdx > oldEndIdx || newStartIdx > newEndIdx (代表旧节点或者新节点已经遍历完）循环结束。
