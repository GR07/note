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



