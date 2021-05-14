# NextTick 是什么

当我们自己调用 nextTick 的时候，它就在更新 DOM 的那个 microtask 任务数组后追加了我们自己的回调函数，从而确保我们的代码在DOM更新后执行。

nextTick 是 vue 一种更新机制，异步更新dom，当数据改变时不会立即更新 dom，会等同一事件循环内的所有数据都操作完成后，再统一更新 dom。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。

更新数据，立即获取更新后的 dom 是获取不到的，所以得把获取 dom 加到事件队列的栈，异步获取更新后的 dom。

Vue 在内部对异步队列会尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

所以 nextTick 优先放入微任务执行，而 setTimeout 是宏任务，因此 nextTick 一般情况下总是先于 setTimeout 执行。

微任务的响应速度相比setTimeout（下一个宏任务）会更快，因为无需等待UI渲染。

等待同一事件循环中的所有数据变化完成之后，会将队列中的watcher.render依次执行，进行DOM的更新

# 例子
```js
data: {
    message: '原始值'
}

// 修改 数据
this.message = '修改后的值1'
this.message = '修改后的值2'
this.message = '修改后的值3'

// 这时候想获取页面最新的DOM节点，却发现获取到的是旧值
console.log(vm.$el.textContent) // 原始值
// 这是因为 message 数据在发现变化的时候，vue 并不会立刻去更新 Dom，而是将修改数据的操作放在了一个异步操作队列中
```


# 为什么这样做

```js
{{num}}
for(let i=0; i<100000; i++){
    num = i
}
```
如果没有 nextTick 更新机制，那么上面这段代码会更新10万次视图，有了nextTick机制，只需要更新一次，所以nextTick本质是一种优化策略。



# 原理实现

1. 把相关依赖的回调函数统一处理压入 callbacks 数组

2. 根据环境支持选用 Promise.then、MutationObserver、setImmediate、setTimeout 变为异步事件，循环执行数组中的回调。

```js
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;

  // cb 回调函数会经统一处理压入 callbacks 数组
  callbacks.push(() => {
    if (cb) {
      // 给 cb 回调函数执行加上了 try-catch 错误处理
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  // 执行异步延迟函数 timerFunc
  if (!pending) {
    pending = true;
    timerFunc();
  }

  // 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve;
    });
  }
}
```

```js
export let isUsingMicroTask = false
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

# 补充：nextTick() 使用：

## this.$nextTick() 箭头函数 or 普通函数 会影响this 指向 ？

## 结论

都可以正确的找到 vue 实例。

因为实例方法 this.$nextTick 为方便起见只是做了进一步封装，把 this 设置为了当前 Vue 实例，所以实例里 箭头函数 普通函数 this 都指向实例。



## 全局方法 Vue.nextTick 函数的源码 接受两个参数：回调函数 / this指向



# 支持 Promise

2.1 版本 nextTick 的实现做了对 promise 的支持，nextTick() 如果没有提供回调且在支持 Promise 的环境中，优先是返回一个 Promise。




## 所以性能没有极致要求 也可以用 async await 形式，配合try catch使用

```javascript
async changeMsg() {
    await this.$nextTick()
    console.log(`dosomething...`)
}
```


```js
var a = 0
var b = async () => {

  a = a + await new Promise((resolve) => {resolve(a++)}) + a
  console.log('2', a) // -> ？
}
b()
a++
console.log('1', a) // -> ？  这样呢
```
