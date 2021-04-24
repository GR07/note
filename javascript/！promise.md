首先 async await 是 生成器（generator）的语法糖

generator 是 iterator 的语法糖



# Promise

实际上 Promise 本身是同步的立即执行函数，只有 promise.then 里的回调函数才是加入到任务队列里。



# async

async 定义的方法默认一定会返回一个promise

这个 promise 要么会通过显示 return xx 被 resolve，要么会通过一个从async函数中抛出的（或其中没有被捕获到的）异常被reject。

如果一个async函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中。
