/**
 * 之前JS是没有块级作用域的，ES6新增块级作用域 const、let。
 */

// 使用var定义的变量为函数级作用域：
{
  var a = 10;
}

console.log(a); // 输出10


// 使用let与const定义的变量为块级作用域：
{
  let a = 10;
}

console.log(a); //-1 or Error“ReferenceError: a is not defined”
