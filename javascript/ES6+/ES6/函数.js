// 参数默认参数，默认值不能被arguments识别

function a(num = 6, callback = function (data) {console.log('ES6: ', data)}) {
  callback(num * num)
}

a() //ES6: 36， 不传参输出默认值

a(10, function(data) {
  console.log(data * 10) // 1000，传参输出新数值
})


// 默认值对arguments对象的影响

function a(num = 1, b = 1){
  console.log(arguments)
}
a() // {} 默认值不能被arguments识别。
a(6, 10) // {"0":6,"1":10}



// 箭头函数和普通函数的区别是：

// 1、箭头函数没有this，函数内部的this来自于父级最近的非箭头函数，并且不能改变this的指向。

// 2、箭头函数没有super

// 3、箭头函数没有arguments

// 4、箭头函数没有new.target绑定。

// 5、不能使用new

// 6、没有原型

// 7、不支持重复的命名参数。

// （没有return则返回undefined）



// 箭头函数还可以输出对象，在react的action中就推荐这种写法。
const action = (type, a) => ({
  type: "TYPE",
  a
})