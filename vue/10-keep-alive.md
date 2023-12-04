# 十步内轻松看懂 keep-alive



## 前言

某天产品提了一个需求，A B C 三个页面之间相互跳转，要求 B 页面有时候需要缓存，有时候要删除缓存，我立马就想到之前有看过关于 keep-alive 的一个骚操作，于是周末抽空又好好看了下 keep-alive 源码深究下，顺便充个电，看了以下内容，相信今后对于这种场景也可以多一种实现方案了。


## 可以得到什么

轻松理解 keep-alive 实现

认识 LRU 算法

Vue 中灵活清除缓存的方式


## keep-alive 是什么

vue 中的内置组件，vue 缓存机制的实现。

别提到源码就害怕，不要慌，看他的源码就 100 行的样子，相对较为简单。



通过控制台可以发现：

沿着 vnode tree 可以找到这个 keep-alive 节点
沿着 dom tree 是找不到的

证明了：这个组件不会渲染出 dom 节点，但是会渲染出 vnode 虚拟节点。

截图。。


## created

created 钩子只做了两件事
```js
created () {
  this.cache = Object.create(null)
  this.keys = []
},
```

cache：是一个对象，用来放缓存的映射

keys：是一个数组，用来放这些组件的标识集合

细节：这两个属性，是没有在 data 里初始化的，说明这两个属性不需要处理成响应式触发视图更新，以后我们日常开发中可以注意避免性能浪费，也算性能优化的一个点。



## destroyed

destroyed 把 cache 里的缓存全部清掉
```js
destroyed () {
  for (const key in this.cache) {
    pruneCacheEntry(this.cache, key, this.keys)
  }
}
```


## mounted

include / exclude 这两个属性文档里都有，大家应该不陌生，监听有变更自然要重新整理 cache 配置
```js
mounted () {
  this.$watch('include', val => {
    pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
    pruneCache(this, name => !matches(val, name))
  })
}
```


## render

因为组件内部手写了render 所以不会模板编译，实现都在这里，是主要内容。


### 第一步：
获取默认插槽，拿到第一个组件节点的 componentOptions 组件选项，不存在直接 return 出去

### 第二步：
拿到组件的 name，用于和 include / exclude 匹配，没匹配到就 return 出去

### 第三步：
根据优先级取组件的key，用于cache缓存的key。

### 第四步：
这里开始就是实现缓存的核心了。如果缓存存在，直接把缓存的实例赋值到新的 vnode 的实例。（从这里可以看出，缓存的其实是组件的实例）

### 第五步：
取了缓存后，该干嘛了？，就到了 keep alive 用的 LRU 更新策略，简单说更新缓存队列，LRU 我简单介绍下，说了要轻松看懂，再简单也要介绍下。

### LRU 算法

算法常用于缓存，越近访问的模块，保持的越久。

假设存放缓存的地方是一个数组，我们设置了最大缓存数量 3，但是一共有 4 个模块，用 LRU 该怎样处理呢

```js
let arr = []
let max = 3
// 共有4个模块 '模块1', '模块2', '模块3', '模块4'

// 访问模块1
arr.push('模块1')
// 访问模块2
arr.push('模块2')
// 访问模块3
arr.push('模块3')
```

此时的数组情况 ['模块1', '模块2', '模块3']

这时去访问模块4

```js
// 访问模块4
arr.push('模块4') // ['模块1', '模块2', '模块3', '模块4']
// 发现超过了限制，于是移除数组第一项
if (arr.length > max) {
  // 实际场景下，移除还会涉及到实例的卸载
  arr.shift()
}
```

此时的数组情况 ['模块2', '模块3', '模块4']

这时去访问模块3

```js
// 因为 模块3 我们前面访问过了，已经在缓存中了，所以再次访问只需要把模块3移动到数组最后面即可
arr.push(...arr.splice(arr.findIndex((item) => item === '模块3'), 1))
```


小结：把上面的几种场景结合起来进行封装，就是 keep-alive 运用的 LRU 策略。（结合实际场景如何封装的清晰健壮，相信各位彦祖都会）

好了，介绍完，我们接着往下走。


### 第六步：
前面是缓存存在直接取，那么不存在，我们直接存起来就好了，并且更新下队列。

### 第七步：
还记得 keep alive 官网有个 max 属性不，这里超过缓存数量时，同理也是采用 LRU 策略。

### 第八步：
给组件打个标识，比如走常规卸载挂载流程的时候通过标识跳过，走 deactivated / activated （这里没有深究，但做的是这些事情）

### 第九步：
返回 vnode


```js
render () {

  // 第一步开始
  const slot = this.$slots.default
  const vnode: VNode = getFirstComponentChild(slot)
  const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
  // 第一步结束

  if (componentOptions) {

    // 第二步开始
    const name: ?string = getComponentName(componentOptions)
    const { include, exclude } = this
    if (
      // not included
      (include && (!name || !matches(include, name))) ||
      // excluded
      (exclude && name && matches(exclude, name))
    ) {
      return vnode
    }
    // 第二步结束

    // 第三步开始
    const { cache, keys } = this
    const key: ?string = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
      : vnode.key
    // 第三步结束
    
    // 第四步开始
    if (cache[key]) {
      vnode.componentInstance = cache[key].componentInstance
      // 第四步结束

      // 第五步开始
      remove(keys, key)
      keys.push(key)
      // 第五步结束
    } else {

      // 第六步开始
      cache[key] = vnode
      keys.push(key)
      // 第六步结束

      // 第七步开始
      if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
      }
      // 第七步结束
    }
    // 第八步开始
    vnode.data.keepAlive = true
    // 第八步结束
  }
  // 第九步
  return vnode || (slot && slot[0])
}
```


## Vue 中如何灵活清除缓存

有的时候会存在一些场景：

A B C 三个页面之间相互跳转，业务要求 B 页面有时候需要缓存，有时候又不想要缓存，看了以上内容，对于这种场景是不又多了一种实现方案了。

官网其实没有提供给我们清除缓存的方法。

如果上面的解读你看懂了，这个方法你也能猜到。

原理：拿到 keep-alive 组件内部的 cache / keys 缓存配置存到全局，根据业务场景手动维护。

基本用法
```js
// 获取
const keepAlive = this._vnode.xxx.xxx.componentInstance
window.keepAlive.cache = keepAlive.cache
window.keepAlive.keys = keepAlive.keys

window.keepAlive.cache = {}
window.keepAlive.keys = []

```

看过源码，发现组件内部还有个更好用的删除方法，另外还可以帮我们销毁处理，但是没有暴露出来，我们可以复制封装到自己项目里（keep-alive.js内）

```js
function pruneCacheEntry (
  cache
  key
  keys
  current
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

pruneCacheEntry(
  window.keepAlive.cache,
  'keyxx',
  window.keepAlive.keys,
  this._vnode
)
```

## 总结

我们总能从源码中取得收获，保持对知识探索的心态。

上面的这种方式也是阅读源码的好处之一，可以给你提供更多的方案思路和可能性。