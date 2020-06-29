概念：

node是单进程单线程的应用程序，v8引擎提供异步回调事件，所以可以处理大量并发，所以性能非常高。

node中机会每一个api都支持回调函数。

所有事件回调都是用设计模式中的观察者模式。

会有一个事件队列，所有回调都会放到队列里，直到触发相应回调修改数据，然后根据数据渲染页面。

node封装的 事件 api
```javascript
let events = require('events')
// 创建实例化 EventEmitter 对象
let eventsEmitter = new events.EventEmitter()
```

url：/nodeLearn/node时间观察者原理/read.js

实现原理例子：
```javascript
let fs = require('fs')

// 开始读取文件
fs.readFile('hello.txt', { flags: 'r', encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        // 读取成功后触发5个回调 看下面的 guorEvent 对象封装

        // 触发事件
        guorEvent.emit('helloSuccess', data) // 3个
        guorEvent.emit('hello', data) // 2个
    }
})

let guorEvent = {
    event: {
        // helloSuccess: [fn, fn, fn]
    },
    on: function (eventName, fn) {
        if (this.event[eventName]) {
            this.event[eventName].push(fn)
        } else {
            this.event[eventName] = []
            this.event[eventName].push(fn)
        }
    },
    emit: function (eventName, data) {
        if (this.event[eventName]) {
            this.event[eventName].forEach((itemFn) => {
                itemFn(data)
            })
        }
    }
}

// 执行顺序按照事件队列添加的顺序

// 创建事件监听

guorEvent.on('helloSuccess', (data) => {
    console.log(`成功后第一件事情`)
})
guorEvent.on('helloSuccess', (data) => {
    console.log(`成功后第二件事情`)
})
guorEvent.on('helloSuccess', (data) => {
    console.log(`成功后第三件事情`)
})

guorEvent.on('hello', (data) => {
    console.log(`hello1111件事情`)
})

guorEvent.on('hello', (data) => {
    console.log(`hello2222件事情`)
})
```


node自带API实现例子：
```javascript
let fs = require('fs')

let events = require('events')

// 创建实例化 EventEmitter 对象
let eventsEmitter = new events.EventEmitter()

// 开始读取文件
fs.readFile('hello.txt', { flags: 'r', encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        // 读取成功后触发
        eventsEmitter.emit('helloSuccess', data) // 3个
    }
})

// 执行顺序按照事件队列添加的顺序

eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第一件事情`)
})
eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第二件事情`)
})
eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第三件事情`)
})
```

async await 实现：
```javascript
let fs = require('fs')

let events = require('events')

// 创建实例化 EventEmitter 对象
let eventsEmitter = new events.EventEmitter()

// 创建promise对象
function guorPromise(path) {
    return new Promise((resolve, reject) => {
        // 开始读取文件
        fs.readFile(path, { flags: 'r', encoding: 'utf-8' }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
// 异步执行触发
async function guorAsync() {
    let res = await guorPromise('hello.txt')
    eventsEmitter.emit('helloSuccess', res)
}
guorAsync()
// 执行顺序按照事件队列添加的顺序

eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第一件事情`)
})
eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第二件事情`)
})
eventsEmitter.on('helloSuccess', (data) => {
    console.log(`成功后第三件事情`)
})
```