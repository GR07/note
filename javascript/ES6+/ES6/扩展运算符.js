/**
 * ... 可以在函数调用、数组构造时, 将数组表达式或者string在语法层面展开。
 */

// 函数调用：
myFunction(...iterableObj);


// 数组或字符串使用：
[...iterableObj, '4', ...'hello', 6];


// 克隆对象：
let obj1 = { foo: 'bar', x: 42 };
let clonedObj = { ...obj1 }; // clonedObj: { foo: "bar", x: 42 }


// 合并数组
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
let arr3 = [...arr1, ...arr2];// 将 arr2 中所有元素附加到 arr1 后面并返回
//等同于
let arr4 = arr1.concat(arr2);


// 数组拷贝 和 Object.assign() 行为一致, 执行的都是浅拷贝(只遍历一层)。
let arr = [1, 2, 3];
let arr2 = [...arr]; // 等同于 arr.slice()
