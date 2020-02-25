/**
 * Promise 是异步编程的一种解决方案，用链式调用替代回调函数（callback）。
 * 
 * 点击、激活焦点、失去焦点、ajax请求数据，这些都属于异步编程。
 */

  

// Promise构造函数只有一个参数，该参数是一个函数，被称作执行器，执行器有2个参数，分别是resolve()和reject()
// Promise实例只能通过resolve或者reject函数来返回，并且使用then()或者catch()获取，不能在new Promise里面直接return，这样是获取不到Promise返回值的。
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(5), 0)
}).then(v => console.log(v)) // 5



// Promise链式调用
// then里面必须return，后面的then才可以接收到。
new Promise(function(resolve, reject) {
  try {
    resolve(5)
  } catch (error) {
    reject('It was my wrong!!!')
  }
}).then(s => s * s).then(s2 => console.log(s2)).then(() => console.log('end'))
// 25  "end"





// Promise的all方法提供了并行执行异步操作的能力，必须等所有异步操作执行完后才执行回调。

let Promise1 = new Promise(function(resolve, reject){})
let Promise2 = new Promise(function(resolve, reject){})
let Promise3 = new Promise(function(resolve, reject){})

let p = Promise.all([Promise1, Promise2, Promise3])

p.then(funciton(){
  // 三个都成功则成功  
}, function(){
  // 只要有失败，则失败 
})



// Promise的race用法：只要有一个 promise 成功了 就执行回调，其他的promise停止。

// 如果 requestImg()成功了就执行then，timeout()成功了执行catch
Promise.race([requestImg(), timeout()]).then((data) =>{
  console.log(data);
}).catch((err) => {
  console.log(err);
});




// 手写用promise封装ajax
const ajaxPromise = (type, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true)
    xhr.onreadystatechange = () => {
      if ( xhr.readyState === 4 && xhr.status=== 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(xhr.status)
      }
    }
    if (type === 'GET') {
      xhr.send()
    } else {
      xhr.setRequestHeader('xxx-')
      xhr.send(dataJs(data))
    }
  })  
  function dataJs (data) {
    const arr = [];
    for (let key in data) {
      arr.push(`${key}=${data[key]}`)
    }
    return arr.join('&');
  }
  return promise;
}

ajaxPromise('POST', 'github.com', {name: 'guor', age: '18'}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})