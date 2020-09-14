在JavaScript中，对象的属性分为可枚举和不可枚举之分，
它们是由属性的enumerable值决定的。
可枚举性决定了这个属性能否被for…in查找遍历到。

一、怎么判断属性是否可枚举

  js中基本包装类型的原型属性是不可枚举的，如Object, Array, Number等



  二、枚举性的作用

属性的枚举性会影响以下三个函数的结果：

for…in

Object.keys() 只能返回对象本身具有的可枚举属性。

JSON.stringify 只能读取对象本身的可枚举属性，并序列化为JSON对象。



function Person() {
    this.name = "KXY";
}
Person.prototype = {
    constructor: Person,
    job: "student",
};
 
var kxy = new Person();
Object.defineProperty(kxy, "sex", {
    value: "female",
    enumerable: false
});




/**
 * 可迭代：可以通过for of将value遍历出来就叫可迭代。
 */