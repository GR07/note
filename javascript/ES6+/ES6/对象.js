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




// 新增了Object.is()来处理2个值的比较 
// 解决JavaScript中特殊类型 == 或者 === 异常的情况


// 出现了异常(错误输出)
console.log(NaN === NaN) // false
console.log(+0 === -0) // true
console.log(5 == "5") //true

// 使用后正常
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(+0, -0)) // false
console.log(Object.is(5, "5")) //false




// Object.assign() 拷贝一个对象给另一个对象，返回一个新对象。（浅拷贝）




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

