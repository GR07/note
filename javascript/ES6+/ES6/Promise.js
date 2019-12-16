/**
 * Promise 是异步编程的一种解决方案，用链式调用替代回调函数（callback）。
 */


// 不使用ES6
setTimeout(function() {
  console.log('Hello'); // 1秒后输出"Hello"
  setTimeout(function() {
    console.log('Hi'); // 2秒后输出"Hi"
  }, 1000);
}, 1000);


// 使用ES6
const waitSecond = new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
});

waitSecond
  .then(function()
  {
    console.log("Hello"); // 1秒后输出"Hello"
    return waitSecond;
  })
  .then(function()
  {
    console.log("Hi"); // 2秒后输出"Hi"
  });



