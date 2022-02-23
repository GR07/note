# 修订 Function.prototype.toString() 

- 以前函数的 toString 来自Object.prototype.toString()，现在的来自 Function.prototype.toString()

- 返回值是一个表示当前函数源代码的字符串。

- 以前只会返回这个函数，不包含注释、空格等。

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString()) 
// 打印如下
// function foo() {
//  // es10新特性
//  console.log("imooc");
// }
```
