/**
 * Rest参数 和 扩展运算符 在ES6只支持数组，ES9 增加对象的支持。
 */



// ES6用于数组

restParam(1, 2, 3, 4, 5);
function restParam(p1, p2, ...p3) {
  // p1 = 1
  // p2 = 2
  // p3 = [3, 4, 5]
}

const values = [99, 100, -1, 48, 16];
console.log( Math.max(...values) ); // 100






// ES9用于对象

const myObject = {
  a: 1,
  b: 2,
  c: 3
};

const { a, ...x } = myObject;
// a = 1
// x = { b: 2, c: 3 }



// 注意：

// 1.只适用于每个对象的顶层，如果对象中嵌套对象则无法适用。

// 2.可以使用扩展运算符拷贝一个对象，像是这样obj2 = {...obj1}，但是 这只是一个对象的浅拷贝。

