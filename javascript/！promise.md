首先 async await 是 生成器（generator）的语法糖

generator 是 iterator 的语法糖



# Promise

实际上 Promise 本身是同步的立即执行函数，只有 promise.then 里的回调函数才是加入到任务队列里。



# async

async 定义的方法默认一定会返回一个promise

这个 promise 要么会通过显示 return xx 被 resolve，要么会通过一个从async函数中抛出的（或其中没有被捕获到的）异常被reject。

如果一个async函数的返回值看起来不是 promise，那么它将会被隐式地包装在一个 promise 中。




# generator

generator 是 iterator 的语法糖


generator 是生成器函数


+ 不会立即执行，会返回一个 gener生成器对象。
```js
function* fun() {
    const b = yield myAjax('http://api/info')
    console.log(b) // { value: 'xxx', done: false } 后面没有代码 done 就是 true
    const c = yield myAjax('http://api/info')
    console.log(c) // { value: 'xxx', done: true } 后面没有代码 done 就是 true
}

// 第一步
// 这时返回一个 generator 对象。
// 但是 fun 里面的所有代码暂时都不会执行。
const run1 = fun()

// 第二步
// 这时会执行 yield myAjax('http://api/info')。
// 注意不会执行前面的赋值操作，以及后面的代码。
const run2 = run1.next()

// 第三步
// 执行 console.log(b) 代码，直到下一个 yield 之前
const run3 = run2.next()

```

+ 结合使用 then 接收 promise
```js
function* fun() {
    const b = yield myAjax('http://api/info')
    console.log(b) // { value: 'xxx', done: false }
}

const gener = func();
const back1 = gener.next() // { value: 'xxx', done: false }

// value 是 myAjax 返回的 promise
back1.value.then(data => {
    // 这里就能拿到 resolve() 的数据
})
```


+ 结合 co 函数 实现 async await
```js
function* fun() {
    const b = yield myAjax('http://api/info')
    console.log(b) // { value: 'xxx', done: false } 后面没有代码 done 就是 true
    const c = yield myAjax('http://api/info')
    console.log(c) // { value: 'xxx', done: true } 后面没有代码 done 就是 true
}

function co() {
    const gener = fun();

    const back1 = gener.next() // { value: 'xxx', done: false }

    function h(res) {
        if (res.done) return;

        res.value.then(data => {
            h(gener.next(data))
        })
    }

    h(back1)
}
```