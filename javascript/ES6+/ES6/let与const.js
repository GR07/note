/**
 * 之前JS是没有块级作用域的，ES6新增块级作用域 const、let。
 */



// var

// 使用var声明的变量，无论是在代码的哪个地方声明的，都会提升到当前作用域的最顶部，这种行为叫做变量提升。
function test() {
  console.log('1: ', a) //undefined
  if (false) {
    var a = 1
  }
  console.log('3: ', a) //undefined
}

test() // 实际执行时，上面的代码中的变量a会提升到函数顶部声明，即使if语句的条件是false，也一样不影响a变量提升。




// 变量没有声明是（is not defined）

// 声明没有赋值是（undefined）

// 没有声明和声明后没有赋值是不一样的，这点一定要区分开。



// const和let的异同点

// 相同点：**const和let都是在当前块内有效，执行到块外会被销毁，也不存在变量提升（TDZ），不能重复声明!。

// 不同点：**const不能再赋值，let声明的变量可以重复赋值。




// let

// let 块级作用域，不会变量提升。
function test() {
  if(true) {
    console.log(a)//TDZ，俗称临时死区，用来描述变量不提升的现象
    let a = 1
  }
}
test()  // a is not defined

function test() {
  if(true) {
    let a = 1
  }
  console.log(a)
}    
test() // a is not defined




// const

// const虽然是常量，不允许修改默认赋值，但如果定义的是对象Object，那么可以修改对象内部的属性值包括新增删除键值对也是可以的。
const type = {
  a: 1
}
type.a = 2 // 没有直接修改type的值，而是修改type.a的属性值，这是允许的。
console.log(type) // {a: 2}

type.b = 3 // 拓展Object也是没有问题的
console.log(type) // {a: 2 , b: 3}

delete type.b = 3 //删除整个键值对也OK的
console.log(type) // {a: 2}

// 如果重新定义数据结构~常量的内存地址值发生改变,这个是不可行的。
type={}; //Assignment to constant variable.
type=[]; //Assignment to constant variable.


// 关于为什么 const 对于引用类型可以改变属性

// 因为 const 不能改变的是栈中的指针，不是堆中的数据。