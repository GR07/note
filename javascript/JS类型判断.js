

new Number()
new String() 
// 算什么类型？

// 1 和 new Number(1) 
// 有什么区别?
// 基本类型和引用类型的区别


const v1 = new Number(123);
typeof v1;// "object"
v1 === 123; // false
v1 == 123; // true

// v1此时是对象，===比较的是内存地址，因此跟数字Number 123不相等


// 什么是基本类型
// 原始类型并不是一个对象，因此并没有对象具有的一些属性和方法；

// 但是为什么能调用(123).toFixed()这些方法呢？

// 原因就是这些方法都是像包装对象"借用"来的，toFixed方法是在Number对象原型上的方法。
"123".indexOf === String.prototype.indexOf // true

// js中一切都是对象 任何都不例外 下面就说明了 都会有 Object.prototype.toString 方法
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
 

// 使用 typeof 来判断数据类型，只能区分基本类型

// 对于数组、null、对象来说，其关系错综复杂，使用 typeof 都会统一返回 “object” 字符串。





// 巧用 “ ! ” 号：可以看到只有null undefined 返回true
!null			   // true			   

!undefined		   // true


!123			  // false

!true			  // false

!{a: 123}		  // false

!function a() { }         // false

!'123'			  // false



// 检测undefined

// 很多常见的工具库都采用这种方式，极力推荐
var isUndefined = function (obj) {
	return obj === void 0;
}
// typeof 也是相对稳定的
var isUndefined = function (obj) {
	return typeof obj === "undefined";
}



// 检测null

// 最直接并且有效
var isNull = function (obj) {
	return obj === null;
};



// 万能
Object.prototype.toString.call()

// 为什么直接用toString不行
// 直接用toString 返回的是相应字符串，因为array / function 是Object new出来的实例 他们的toString()被重写了，
// 并不是原型链上的Object.prototype.toString()

// 删除了Array的toString方法后，再用arr.toString()方法调用时，不再有屏蔽Object原型方法的实例方法，因此沿着原型链，arr最后调用了Object的toString方法
console.log((1).toString()); // 1

var arr=[1,2,3];
console.log(Array.prototype.hasOwnProperty("toString"));//true
console.log(arr.toString());//1,2,3
delete Array.prototype.toString;//delete操作符可以删除实例属性
console.log(Array.prototype.hasOwnProperty("toString"));//false
console.log(arr.toString());//"[object Array]"






