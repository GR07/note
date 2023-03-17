# axios 是什么

是基于 XMLHttpRequest 对象 的 http 封装


# 封装作用

1. 统一 baseUrl

2. 设置通用基础 header

3. 请求拦截器 token 加在 自定义头部，取消重复请求

4. 相应拦截器 统一错误状态码处理

5. 统一封装 请求方法



## 统一处理 baseUrl

利用node环境变量来作判断，用来区分开发、测试、生产环境

```js
const baseURL = {
    development: "https://zxzs.ininin.com/api/", // 本地运行

    test: "https://zxzs.ininin.com/api/", // 测试环境

    prod: "https://prozxzs.ininin.com/api/", // 正式环境
}[process.env.VUE_APP_API_MODE];
```

仅限在本地调试的时候，可以在 vue.config.js 文件中配置devServer实现代理转发，从而实现跨域
```js
devServer: {
    proxy: {
      // /proxyApi 开头的请求都会被代理到 http://dev.xxx.com
        '/proxyApi': {
            target: 'http://dev.xxx.com',
            changeOrigin: true,
            pathRewrite: {
                '/proxyApi': ''
            }
        }
    }
}
```


## 设置请求头与超时时间

一般请求头都是固定的，只有少部分情况下，会需要一些特殊的请求头。

将通用性的请求头作为基础配置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置。

```js
const service = axios.create({
    ...
    timeout: 30000,  // 请求 30s 超时
    headers: {
        get: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        },
        post: {
          'Content-Type': 'application/json;charset=utf-8'
          // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
        }
    },
})
```


## 封装请求方法

```js
/**
 * 封装get请求
 * @param {String} url 请求地址
 * @param {Object} params 参数
 * @param {Object} that 请求参数
 * @param {Boolean} isReturnUrl 是否直接返回URL地址
 * @returns {String|Promise} url地址或者请求promise
 */
export function get(url, params = {}) {
    return service({
        url,
        method: "get",
        params,
    });
}

/**
 * 封装post请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} headers 请求headers
 * @returns {Promise} 请求
 */
export function post(url, data = {}, headers) {
    return service({
        url,
        method: "post",
        data,
        // multipart/form-data
        headers: {
            "Content-Type": headers ? headers : "application/json;charset=UTF-8",
        },
    });
}

/**
 * 封装put方法
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @returns {Promise} 请求
 */
export function put(url, data = {}) {
    return service({
        url,
        method: "put",
        data,
    });
}
/**
 * delete请求
 * @param {String} url
 * @param {Object} params
 * @returns {Promise} 请求Promise
 */
export function deletes(url, params = {}) {
    return service({
        url,
        method: "delete",
        params,
    });
}
```


## 请求拦截器

```js
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
```


## 响应拦截器

```js
// 响应拦截器
axios.interceptors.response.use(response => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})
```



## 取消重复请求


## 核心——CancelToken

### 在Axios中取消请求最核心的方法是CanelToken。

```javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  // 在options中直接创建一个cancelToken对象
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  })
});

// 取消上面的请求
cancel();
```


### 实现的大体思路：

1. 我们需要对所有正在进行中的请求进行缓存。在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。

2. 在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求

```javascript
// 正在进行中的请求列表
let reqList = []

/**
 * 阻止重复请求
 * @param {array} reqList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 请求中断函数
 * @param {string} errorMessage - 请求中断时需要显示的错误信息
 */
// 对所有正在进行中的请求进行缓存。
// 在请求发起前判断缓存列表中该请求是否正在进行，如果有则取消本次请求。
const stopRepeatRequest = function (reqList, url, cancel, errorMessage) {
  const errorMsg = errorMessage || ''
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel(errorMsg)
      return
    }
  }
  reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
// 在任意请求完成后，需要在缓存列表中删除该次请求，以便可以重新发送该请求
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

const service = axios.create()

// 请求拦截器
service.interceptors.request.use(
  config => {
	let cancel
  	// 设置cancelToken对象
    config.cancelToken = new axios.CancelToken(function(c) {
    	cancel = c
    })
    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    stopRepeatRequest(reqList, config.url, cancel, `${config.url} 请求被中断`)
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      allowRequest(reqList, response.config.url)
    }, 1000)
    // ...请求成功后的后续操作
    // successHandler(response)
  },
  error => {
    if (axios.isCancel(thrown)) {
      console.log(thrown.message);
    } else {
      // 增加延迟，相同请求不得在短时间内重复发送
      setTimeout(() => {
        allowRequest(reqList, error.config.url)
      }, 1000)
    }
    // ...请求失败后的后续操作
    // errorHandler(error)
  }
)
```

### 为什么在 response 中需要增加延迟？

因为不想让用户在极短的时间内重复进行相同请求。


### 注意：在 response 中阻止请求和在 request 中的阻止请求是两个概念

request中是阻止上个请求 未完成 时又开始了相同的请求

response中是阻止上个请求 完成后 一段时间内不允许相同请求
