// ES5的严格模式下 和 ES6环境下  无论参数怎么改变 arguments 只会是最初的 arguments
// 参数默认参数，默认值 不能被 arguments 获取到

function a(num = 6, callback = function (data) {console.log('ES6: ', data)}) {
  callback(num * num)
}

// 函数参数中使用 ...arr 只是用于可以给函数传 多个参数
function add(...arr) {
  console.log(a + b) // 3
  console.log(arr) // [1, 2]
}
let a = 1, b = 2
add(a, b)



// 箭头函数和普通函数的区别是：

// 1、箭头函数没有this，函数内部的this来自于父级最近的非箭头函数，使用call()和apply()调用不能改变this的指向。

// 2、箭头函数没有super

// 3、箭头函数没有arguments 用rest参数...解决

// 4、箭头函数没有new.target绑定。

// 5、不能作为构造函数 不能使用new

// 6、没有原型

// 7、不支持重复的命名参数。

// （没有return则返回undefined）



// 箭头函数还可以输出对象，在react的action中就推荐这种写法。
const action = (type, a) => ({
  type: "TYPE",
  a
})