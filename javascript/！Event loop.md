# 事件执行顺序

先执行主线程（也就是同步代码）

再执行所有微任务（promise.then）

最后执行回调（setTimeout）


主线程更新前 ---> 遇到宏任务或微任务 ---> 放入栈 ---> 主线程执行完成，更新完成 ----> 执行栈 ---- > 获取更新后的dom


# 栈

1. 又名堆栈，一个数据集合，仅可以在一端进行增删。

2. 就像一个桶，规则为，后添加的，先出来，后进先出。

3. 栈是操作系统建立某个进程时，为这个进程建立的一个存储区域



# 事件队列

队列是先进先出的集合

浏览器的event loop至少包含两个队列，宏任务队列和微任务队列



首先 async await 是 生成器（generator）的语法糖

generator 是 iterator 的语法糖




# 异步任务被分为两类

## 微任务（micro task）

new Promise()
new MutaionObserver()

## 宏任务（macro task）

setTimeout
MessageChannel
postMessage
setImmediate



# Promise / setTimeout

实际上 Promise 本身是同步的立即执行函数，只有 promise.then 里的回调函数才是加入到任务队列里。



HTML5中规定setTimeout的最小时间延迟是4ms


# async

async 定义的方法默认一定会返回一个promise

这个 promise 要么会通过显示 return xx 被 resolve，要么会通过一个从async函数中抛出的（或其中没有被捕获到的）异常被reject。

如果一个async函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中。


# 简单例子
```js
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");

```

setTimeout 是一个宏任务，回调函数会在下次事件循环执行宏任务前执行。

then 会通过微任务队列，在当前事件循环之后执行。

alert 首先显示，因为它是常规的同步调用。

