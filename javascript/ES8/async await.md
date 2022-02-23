# 介绍

我们都知道使用 Promise 能很好地解决回调地狱的问题，但如果处理流程比较复杂的话，那么整段代码将充斥着 then，语义化不明显，代码不能很好地表示执行流程。

基于这个原因，ES8 引入了 async/await，这是 JavaScript 异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。


# 理解

JavaScript的异步编写方式，从 回调函数 到 Promise、Generator 再到 Async/Await。表面上只是写法的变化，但本质上则是语言层的一次次抽象。让我们可以用更简单的方式实现同样的功能，而不需要去考虑代码是如何执行的。换句话说就是：异步编程的最高境界，就是根本不用关心它是不是异步。



# async 关键字

前面添加了 async 的函数在执行后都会自动返回一个Promise对象

```js
function foo() {
    return 'jimmy'
}
console.log(foo()) // 'jimmy'

// async
async function foo() {
    return 'jimmy' // Promise.resolve('jimmy')
}
console.log(foo()) // Promise
foo()
```


# await

async函数中使用await，那么await这里的代码就会变成同步的了，意思就是说只有等await后面的Promise执行完成得到结果才会继续下去，await就是等待。

- 其实它后面可以放任何表达式，不过我们更多放的是一个promise对象的表达式。

- 会暂停当前async函数的执行，等await后面的Promise计算结果返回后，再继续往下执行async函数。

- await等待的不是所有的异步操作，等待的只是Promise。

- 如果不是Promise，会得到一个表达式的运算结果，也不会阻塞。

```js
function timeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 1000)
    })
}

// 不加async和await是2、1   加了是1、2
async function foo() {
    await timeout() 
    console.log(2)
}
foo()
```


# async/await的缺陷

比如一个await 等3秒后 执行下一行代码，那么三个await 就是 等 9秒。

- 解决 通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕

```js
// 将三个Promise对象存储在变量中，这样可以使它们的相关进程同时运行。这将导致总运行时间约为3秒。

const a = guor() 
const b = guor() 
const c = guor()
await a
await b
await c
```