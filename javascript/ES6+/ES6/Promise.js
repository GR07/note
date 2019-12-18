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



  

// Promise的all方法提供了并行执行异步操作的能力，接收一个数组参数，并且在所有异步操作执行完后才执行回调。

let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功  
}, function(){
  // 只要有失败，则失败 
})



// Promise的race用法：只要有一个 promise 成功了 就执行回调。

 //请求某个图片资源
 function requestImg(){
  var p = new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = function(){
          resolve(img);
      }
      img.src = '图片的路径';
  });
  return p;
}
//延时函数，用于给请求计时
function timeout(){
  var p = new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('图片请求超时');
      }, 5000);
  });
  return p;
}
// 如果 requestImg()成功了就执行then，timeout()成功了执行catch
Promise.race([requestImg(), timeout()]).then((data) =>{
  console.log(data);
}).catch((err) => {
  console.log(err);
});


