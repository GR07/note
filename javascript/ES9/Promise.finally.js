/**
 * 一个Promise调用链要么成功到达最后一个.then()，要么失败触发.catch()。
 * 
 * 但是有时候你想它无论成功失败都会执行一段代码，Promise.finally() 就出现了
 */

// 无论调用了then / catch 最终都会再来执行 finally 中的代码
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // 无论调用了then / catch 最终都会再来执行 finally 中的代码
  });
}
