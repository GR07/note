# 定义

this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用。

函数调用方式决定 this 指向，总指向调用它的对象。



# 不可修改

this 在函数执行过程中，不可修改。

```js
function fn() {
  this = obj; // 修改this，运行后会报错
  console.log(this.a);
}
fn();
```


# 什么是执行上下文

1. 变量、函数表达式 —— 变量声明（默认赋值为undefined）
2. this —— 赋值
3. 函数声明 —— 赋值

以上三种数据的准备，我们称之为 “执行上下文” 或者 “执行上下文环境”



# 几种场景

全局环境中定义的函数， 指向 window 对象

注：只有在非严格模式下，默认绑定才是 window 否则 undefined
```js
// 全局变量
var name = 'Jenny';
function person() {
    return this.name;
}
console.log(person());  // Jenny
```


# 作为某个对象的方法调用，就指这个对象

1. 情况一
```js

function test() {
  console.log(this.x);
}

var obj = {};

// 为对象添加一个属性 m
obj.m = test;
// 调用
obj.m(); // 1
```

2. 情况二
```js
// 尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象
var o = {
    a:10,
    b:{
        fn:function(){
            // this 的上一级对象为 b，b 内部并没有 a 变量的定义，所以输出 undefined
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```

3. 情况三
```js
// 记住，this永远指向的是最后调用它的对象
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); // undefined
            console.log(this); // window
        }
    }
}
// 虽然 fn 是对象 b 的方法，但是 fn 赋值给 j 时候并没有执行
var j = o.b.fn;
j();
```


# new 实例

this指向这个实例对象

1. 情况一
```js
function test() {
 this.x = 1;
}
var obj = new test();
// 因为 new关键字改变了this的指向，原理具体看 new 的实现
obj.x // 1
```

2. 情况二
```js
// new 过程 构造函数 return 一个对象，此时this指向为返回的对象
function fn() {  
    this.user = 'xxx';  
    return {};  
}
var a = new fn();  
console.log(a.user); // undefined
```

3. 情况三
```js
// new 过程 构造函数 return 一个基本类型，此时this指向实例对象
function fn() {  
    this.user = 'xxx';  
    return 1;
}
var a = new fn;  
console.log(a.user); // xxx

// 如果 return null，new 仍然指向实例对象
```



# 箭头函数

函数在定义时就能确定 this 的指向（编译时绑定）

1. 情况一
```js
const obj = {
  sayThis: () => {
    console.log(this); // window
  }
};

obj.sayThis(); // window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
const globalSay = obj.sayThis;
globalSay(); // window 浏览器中的 global 对象
```

2. 情况二
```js
// 绑定事件监听 this指向window
const button = document.getElementById('mngb');
button.addEventListener('click', ()=> {
    console.log(this === window) // true
    this.innerHTML = 'clicked button'
})
```

3. 情况三
```js
// 原型上添加方法 this指向window
Cat.prototype.sayName = () => {
    console.log(this === window) // true
    return this.name
}
const cat = new Cat('mm');
cat.sayName()
```