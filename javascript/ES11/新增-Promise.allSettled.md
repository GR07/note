# Promise.allSettled()

Promise.all 具有并发执行异步任务的能力，但它的问题就是如果其中某个任务出现异常 reject ，所有任务都会挂掉，Promise 直接进入 reject 状态。

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是 Promise.allSettled 的作用


# 演示

```javascript
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //   reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      //   reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve("promise3");
      reject("error promise3 ");
    }, 2000);
  });
};

//  Promise.all 会走到catch里面
Promise.all([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res); 
  })
  .catch((error) => {
    console.log("error", error); // error promise3 
  });
  
// Promise.allSettled 不管有没有错误，三个的状态都会返回
Promise.allSettled([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res);  
    // 打印结果 
    // [
    //    {status: 'fulfilled', value: 'promise1'}, 
    //    {status: 'fulfilled',value: 'promise2'},
    //    {status: 'rejected', reason: 'error promise3 '}
    // ]
  })
  .catch((error) => {
    console.log("error", error); 
  });
```

我们期望的是 并发任务中，无论一个任务正常或者异常，都会返回对应的的状态与结果，

在 then 里面通过 filter 来过滤出想要的业务逻辑结果，这就能最大限度的保障业务当前状态的可访问性。

```javascript
Promise.allSettled([
    Promise.reject({code: 500, msg: '服务异常'}),
    Promise.resolve({ code: 200, list: []}),
    Promise.resolve({code: 200, list: []})
])
.then((res) => {
    /*
        0: {status: "rejected", reason: {...}}
        1: {status: "fulfilled", value: {...}}
        2: {status: "fulfilled", value: {...}}
    */
    // 过滤掉 rejected 状态，尽可能多的保证页面区域数据渲染
    RenderContent(res.filter((el) => {
        return el.status !== 'rejected';
    }));
});
```
