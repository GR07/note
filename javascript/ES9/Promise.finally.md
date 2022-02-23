# Promise.prototype.finally()

一个Promise调用链要么成功到达最后一个.then()，要么失败触发.catch()，但是有时候你想它无论成功失败都会执行一段代码，Promise.finally() 就出现了


```js
// 无论调用了then / catch 最终都会再来执行 finally 中的代码
// 避免同样的语句需要在then()和catch()中各写一次的情况

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        // reject('fail')
    }, 1000)
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
}).finally(() => {
    console.log('finally')
})
```

# 使用场景

- loading关闭

不管请求成功或是失败，这个loading都需要关闭掉，这时把关闭loading的代码写在finally里再合适不过了
