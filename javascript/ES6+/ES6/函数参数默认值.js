/**
 * ES6支持在定义函数的时候为其设置默认值
 */
function foo(height = 50, color = 'red') {
    // ...
}


// 不使用默认值的问题
function foo(height, color) {
  let height = height || 50;
  let color = color || 'red';
  //...
}
foo(0, "") // 0会被认为是false 所以会赋值为50