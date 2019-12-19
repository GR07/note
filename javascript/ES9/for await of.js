/**
 * await 结合 for...of循环一起使用，可以循环执行异步代码
 */

// 你可能尝试在同步循环中调用异步代码
// 这段代码不会按照理想执行，因为同步代码优先权 先于 异步代码。
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}


// ES9 await 结合 for...of
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}

