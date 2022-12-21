# 构造函数中的 return


# 常规没有 return 的情况

```js
function Fn() {
  this.color = 'red'
  this.price = '2999'
}
let res = new Fn()
console.log(res) // { color: 'red', price: '2999' }
```


# 有 return 的情况

```js
// return 基本类型
function Fn() {
    this.color = 'red'
    this.price = '2999'
    return '我是返回值'
}
let res = new Fn()
console.log(res) // {color: 'red', price: '2999'}

// return 引用类型
function Fn2() {
    this.color = 'red'
    this.price = '2999'
    return { text: '我是返回值' }
 }
 let res2 = new Fn2()
 console.log(res2) // {text: '我是返回值'}
```

# 总结

- 没有返回值，返回的是一个我们常见的实例对象

- 返回值是一个值类型，和没有返回值保持一致，依然是一个常见的实例对象

- 返回值是引用类型，返回值就是这个引用类型


# 摘录自 mdn 的总结（new的过程）

- 当代码 new Foo(...) 执行时，会发生以下事情：

  一个继承自 Foo.prototype 的新对象被创建。

  使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。
  
  new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
  
  由构造函数返回的对象就是 new 表达式的结果。
  
  如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
