/**
 * async 函数：
 * 
 * 先说一下async的语法，它作为一个关键字放在函数前面，用于表示函数是一个异步函数。
 * 
 * 异步函数也就是意味着这个函数的执行不会阻塞后面代码的执行。
 * 
 */


// 简单写一个async函数
async function hello(){
  return 'hello world';
}

// async异步函数返回的是一个promise对象，如果要获取到promise返回值，我们就应该使用.then方法。
hello().then((v) => {
  console.log(v); // 'hello world'
});



/**
 * await：
 * 
 * 再来熟悉一下await关键字，await是等待的意思，那么它在等待什么呢？
 * 其实它后面可以放任何表达式，不过我们更多放的是一个promise对象的表达式。
 * 
 * 会暂停当前async函数的执行，等await后面的Promise计算结果返回后，再继续往下执行async函数。
 * 
 * await等待的不是所有的异步操作，等待的只是Promise。
 * 
 * 如果不是Promise，会得到一个表达式的运算结果，也不会阻塞。
 * 
 */

// 新建promise
function awaitMethod(num){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(2*num);
    },2000)
  })
}
// 使用
async function test (){
  let result = await awaitMethod(30);
  console.log(result);
}
test() // 2秒钟之后控制台输出60






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