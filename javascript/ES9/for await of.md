# for-await-of


for of 方法不能遍历异步迭代器，因为同步代码优先权 先于 异步代码，于是 for await of 就登场了。

异步迭代器，循环等待每个Promise对象变为resolved状态才进入下一步。


```js
// for await of 环等待每个Promise对象变为resolved状态才进入下一步。

function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}
test()
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

