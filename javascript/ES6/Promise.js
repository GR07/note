/**
 * Promise 是异步编程的一种解决方案，用链式调用替代回调函数（callback）。
 * 
 * Promise本身不是异步的，只有他的then()或者catch()里面的回调才是异步，也可以说Promise的返回值是异步的。
 * 
 * 点击、激活焦点、失去焦点、ajax请求数据，这些都属于异步编程。
 */



// Promise构造函数只有一个参数，该参数是一个函数，被称作执行器，执行器有2个参数，分别是resolve()和reject()
// Promise实例只能通过resolve或者reject函数来返回，并且使用then()或者catch()获取，不能在new Promise里面直接return，这样是获取不到Promise返回值的。
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(5), 0)
}).then(v => console.log(v)) // 5



// Promise链式调用
// then里面必须return，后面的then才可以接收到。
new Promise(function (resolve, reject) {
  try {
    resolve(5)
  } catch (error) {
    reject('It was my wrong!!!')
  }
}).then(s => s * s).then(s2 => console.log(s2)).then(() => console.log('end'))
// 25 25 "end"





// 只有所有的状态都变成fulfilled，状态才会变成 fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给then的回调函数

// 只要之中有一个被rejected，状态就变成 rejected，此时第一个被reject的实例的返回值，传递给then的回调函数。

Promise.all([
  new Promise(function (resolve, reject) {
    resolve(1)
  }),
  new Promise(function (resolve, reject) {
    resolve(2)
  }),
  new Promise(function (resolve, reject) {
    resolve(3)
  })
]).then(arr => {
  console.log(arr) // [1, 2, 3]
})



// 只要之中有一个实例率先改变状态，状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给then、catch回调函数。其他的promise停止。

// 如果 requestImg()成功了就执行then，timeout()成功了执行catch
Promise.race([requestImg(), timeout()]).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
});



// Promise派生: 定义一个新的Promise对象，继承Promise方法和属性。

class MyPromise extends Promise {

  //重新封装then()
  success (resolve, reject) {
    return this.then(resolve, reject)
  }
  //重新封装catch()
  failer (reject) {
    return this.catch(reject)
  }
}
// 接着我们来使用一下这个派生类。​

new MyPromise(function (resolve, reject) {
  resolve(10)
}).success(v => console.log(v)) // 10



// 手写用promise封装ajax
const ajaxPromise = (type, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(type, url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
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

ajaxPromise('POST', 'github.com', { name: 'guor', age: '18' }).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})