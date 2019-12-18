/**
 * async 函数：
 * 
 * 定义一个异步函数，它会返回一个隐式的 Promise。
 * 
 * 如果async函数中是return一个值，这个值就是Promise对象中resolve的值。
 * 
 * 如果async函数中是throw一个值，这个值就是Promise对象中reject的值。
 * 
 * 它总是与 await 一起使用的，并且 await 只能在 async 函数体内。
 * 
 * 存在意义：它的最大价值在于，可以使异步代码，在形式上，更接近于同步代码。
 * 
 */


// async函数的写法
async function imAsync(num) {
  if (num > 0) {
    return num // 这里相当于resolve(num)
  } else {
    throw num // 这里相当于reject(num)
  }
}
// 执行
imAsync(1).then(function (v) {
  console.log(v); // 1
});
// 注意这里是catch
imAsync(0).catch(function (v) {
  console.log(v); // 0
})


// Promise的写法
function imPromise(num) {
  return new Promise(function (resolve, reject) {
    if (num > 0) {
      resolve(num);
    } else {
      reject(num);
    }
  })
}

imPromise(1).then(function (v) {
  console.log(v); // 1
})

imPromise(0).then(function (v) {
  console.log(v); // 0
})



/**
 * await：
 * 
 * await 是个运算符，用于组成表达式，它会阻塞后面的代码。
 * 
 * 会暂停当前async函数的执行，等await后面的Promise计算结果返回后，再继续往下执行async函数。
 * 
 * await等待的不是所有的异步操作，等待的只是Promise。
 * 
 * 如果不是Promise，会得到一个表达式的运算结果，也不会阻塞。
 */




/**
 * async 相较于 Promise 的优势
 * 
 * 相比于 Promise，它能更好地处理 then 链，几乎跟同步代码一样。
 */

// 示例
function takeLongTime(n) {
  return new Promise(resolve => {
      setTimeout(() => resolve(n + 200), n);
  });
}
function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}
function step2(n) {
  console.log(`step2 with ${n}`);
  return takeLongTime(n);
}
function step3(n) {
  console.log(`step3 with ${n}`);
  return takeLongTime(n);
}

// 用 Promise 方式来实现以上
function doIt() {
  console.time("doIt");
  const time1 = 300;
  step1(time1)
      .then(time2 => step2(time2))
      .then(time3 => step3(time3))
      .then(result => {
          console.log(`result is ${result}`);
      });
}
doIt();

// 用 async/await 来实现
async function doIt() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`result is ${result}`);
}
doIt();




/**
 * 如果 有三个步骤，每个步骤都需前一个的结果，就会更方便
 */
async function doIt() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time1, time2);
  const result = await step3(time1, time2, time3);
  console.log(`result is ${result}`);
}
doIt();


/**
 * 结语：
 * 
 * JavaScript的异步编写方式，从 回调函数 到 Promise、Generator 再到 Async/Await。
 * 表面上只是写法的变化，但本质上则是语言层的一次次抽象。
 * 让我们可以用更简单的方式实现同样的功能，而不需要去考虑代码是如何执行的。
 * 换句话说就是：异步编程的最高境界，就是根本不用关心它是不是异步。
 */