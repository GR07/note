# NextTick 是什么

nextTick 是 vue 一种更新机制，异步更新dom，当数据改变时不会立即更新 dom，会等同一事件循环内的所有数据都操作完成后，再统一更新 dom。

如果一直修改相同数据，异步操作队列还会进行去重。


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




# 补充：nextTick() 使用：

## this.$nextTick() 箭头函数 or 普通函数 会影响this 指向 ？

## 结论

都可以正确的找到 vue 实例。

因为实例方法 this.$nextTick 是做了进一步封装，把 this 设置为了当前 Vue 实例，所以实例里 箭头函数 普通函数 this 都指向实例。



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