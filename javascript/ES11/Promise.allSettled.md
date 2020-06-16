Promise.all 具有并发执行异步任务的能力，但它的最大问题就是如果其中某个任务出现异常 reject ，所有任务都会挂掉，Promise 直接进入 reject 状态。

```javascript
Promise.all([
    Promise.reject({code: 500, msg: '服务异常'}),
    Promise.resolve({ code: 200, list: []}),
    Promise.resolve({code: 200, list: []})
])
.then((res) => {
    // 如果其中一个任务是 reject，则不会执行到这个回调。
    RenderContent(res);
})
.catch((error) => {
    // 会执行到 catch 这个回调
    // error: {code: 500, msg: "服务异常"}
})
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