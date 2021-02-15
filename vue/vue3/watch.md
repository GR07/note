## 写在 setup 内

接收两个参数：需要监听的值（如果监听多个值就是一个数组） / 回调函数
```js
// 注意数组里只可以监听 ref() 包装的值，reactive()包装的必须通过 getter返回 () => c 
watch([a, b, () => c], (newValue, oldValue) => {
    console.log(newValue) // 新值
    console.log(oldValue) // 旧值
})
```