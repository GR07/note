# 是什么

三个都是 Function 原型对象上的方法，只可以作为函数调用。


# 作用

把函数执行一遍，并且改变函数内部 this 的指向（前提是函数内部有使用this）

# 语法

```js
// call / apply 马上执行该函数
fun.call(thisArg, param1, param2, ...)
// call / apply 马上执行该函数
fun.apply(thisArg, [param1,param2,...])
// bind 则是返回改变了上下文后的函数，不执行该函数
fun.bind(thisArg, param1, param2, ...)
```

# 返回值

- call / apply：返回 fun 执行的结果

- bind：返回 fun 的拷贝，并拥有指定的 this 值和初始参数


# 参数

- 第一个参数 (可选)

1. fun 内部的 this 指向（如果传入是基础类型，会转换为包装对象，例如字符串的new String()）



- 第二三四个参数（可选）

传给fun的参数。

1. 如果不传或为 null / undefined，则表示不需要传入任何参数

2. apply 第二个参数为数组，数组内的值为传给fun的参数



# 使用场景

- 借用方法

```js
// 类数组 借用
var arrayLike = {
  0: 'OB',
  1: 'Koro1',
  length: 2
}
Array.prototype.push.call(arrayLike, '添加元素1', '添加元素2');
console.log(arrayLike) // {"0":"OB","1":"Koro1","2":"添加元素1","3":"添加元素2","length":4}


// 最大值 最小值
const arr = [15, 6, 12, 13, 16];
const max = Math.max.apply(Math, arr); // 16
const min = Math.min.apply(Math, arr); // 6


// 字符串 借用
let str = 'abc'
str.split('').join(',') // 'a,b,c'
[].join.call(',') // 'a,b,c'


// 字符串 借用循环
let str = 'abc'
[].forEach.call(str, (item) => {console.log(item)})
```


- 继承

ES5 的继承也都是通过借用父类的构造方法来实现父类方法 / 属性的继承
```js
// 父类
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']; // 复杂类型
}
supFather.prototype.sayName = function (age) {
    console.log(this.name, 'age');
};
// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的 this 指向，赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}
// 重写子类的 prototype，修正 constructor 指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正 constructor 指向到继承的那个函数上
}
inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, 'foo');
};
// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub("OBKoro1", 24);
const instance2 = new sub("小明", 18);
instance1.colors.push('black')
console.log(instance1) // {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2) // {"name":"小明","colors":["red","blue","green"],"age":18} 
```

# 替代闭包 bind 保存变量

```js
// 场景
for (var i = 1; i <= 5; i++) {
  setTimeout(function test() {
    console.log(i) // 依次输出：6 6 6 6 6
  }, i * 1000);
}

// 闭包 解决
for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function () {
        console.log('闭包:', i); // 依次输出：1 2 3 4 5
    }, i * 1000);
  }(i));
}

// bind 解决
// 实际上这里也用了闭包，因为 bind 会返回一个函数，这个函数也是闭包。
for (var i = 1; i <= 5; i++) {
  setTimeout(function test(i) {
    console.log(i) // 依次输出：1 2 3 4 5
  }.bind(null, i), i * 1000);
}
```


# 传递回调函数 this 丢失的解决方案

```js
// bind 解决
// 这是典型bind的应用场景， 绑定 this 指向，用做回调函数
// 这也是为什么 react 的 render 函数在绑定回调函数的时候，也要使用 bind 绑定一下 this 的指向，也是因为同样的问题以及原理。
this.pageClass = new Page(this.handleMessage.bind(this)) // 绑定回调函数的this指向


// 箭头函数解决
this.pageClass = new Page(() => this.handleMessage()) // 箭头函数绑定this指向
```


# call、apply 该用哪个？

- call apply 的效果完全一样

- 参数数量 / 顺序确定就用 call，参数数量 / 顺序不确定的话就用 apply

- 考虑可读性 参数数量不多就用 call，参数数量比较多的话，把参数整合成数组，使用 apply

- 参数集合已经是一个数组的情况，用 apply，比如上文的获取数组最大值 / 最小值。


