/**
 * 1.属性初始值简写
 * 
 * 2.方法简写
 * 
 * 3.属性名可计算
 * 
 * 4.ES6对象新增方法Object.is()、Object.assign()
 */

// 属性简写
//ES5
function a(id) {
  return {
    id: id
  };
};

//ES6
const a = (id) => ({
  id
})


// 方法简写
// ES5
const obj = {
  id: 1,
  printId: function() {
    console.log(this.id)
  }
}

// ES6
const obj = {
  id: 1,
  printId() {
    console.log(this.id)
  }
}



// 属性名可计算
// 属性名可以传入变量或者常量，而不只是一个固定的字符串。
const id = 5
const obj = {
  [`my-${id}`]: id
}
console.log(obj['my-5']) // 5




// 为了解决历遗留问题，新增了Object.is()来处理2个值的比较。

// 不符合预期
console.log(NaN === NaN) // false
console.log(+0 === -0) // true
console.log(5 == "5") //true

// 符合预期
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(+0, -0)) // false
console.log(Object.is(5, "5")) //false




// Object.assign() 拷贝一个对象给另一个对象，返回一个新对象。（浅拷贝）
// 只复制源对象中可枚举的属性和对象自身的属性
// 实现assign 注意是浅拷贝！！！
function mixin(receiver, supplier) {
  Object.keys(supplier).forEach((key) => {
      receiver[key] = supplier[key]
  })
  return receiver
}

// 当有同名属性 后面会覆盖前面的
let MyComponent = {a: 1}
let guor = {a: 2, b: 3}


// 当源对象某个属性的值是对象 就是拷贝是这个对象的引用
// 如果不是对象，加上 {} 则是深拷贝。
let MyComponent = {a: {guor: 1111111}}
let guor = {a: 2, b: 3}

let obj = Object.assign({}, MyComponent, guor)

console.log(obj) // { c: { guor: 1111111 }, a: 2, b: 3 }
// 改变属性值
MyComponent.guor = 444
// 也变了
console.log(obj) // { c: { guor: 444 }, a: 2, b: 3 }

// 会被自动排序 数字在前面然后字母
const state = {
  id: 1,
  5: 5,
  name: "eryue",
  3: 3
}
console.log(Object.assign(state, null)) // { '3': 3, '5': 5, id: 1, name: 'eryue' }

// Object.setPrototypeOf() 改变实例化后的对象原型。

let a = {
  name() {
    return 'eryue'
  }
}
let b = Object.create(a)
console.log(b.name()) // eryue
  
//使用setPrototypeOf改变b的原型
let c = {
  name() {
    return "sb"
  }
}    
Object.setPrototypeOf(b, c)    
console.log(b.name()) //sb

