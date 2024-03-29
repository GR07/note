# axios 是什么

是基于 XMLHttpRequest 对象 的 http 封装


# 封装作用

1. 统一 baseUrl

2. 设置通用基础 header

3. 请求拦截器 token 加在 自定义头部，取消重复请求

4. 相应拦截器 统一错误状态码处理

5. 统一封装 请求方法



## 前端本地代理

利用node环境变量来作判断，用来区分开发、测试、生产环境

仅限在本地调试的时候，可以在 vue.config.js 文件中配置devServer实现代理转发，从而实现跨域
```js
// process.env.VUE_APP_API_MODE
const { defineConfig } = require("@vue/cli-service");

const PROXY_ENV = process.env.PROXY_ENV || 'one'
const targets = {
  one: 'https://xxx.com',
  two: 'https://xxx.com',
  three: 'https://xxx.com',
  four: 'https://www.xxx.com'
}
console.log(`代理到${PROXY_ENV}环境：${targets[PROXY_ENV]}`)
module.exports = defineConfig({
  // transpileDependencies: true,
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/router': {
        target: targets[PROXY_ENV],
        changeOrigin: true
      }
    }
  }
});
// 执行
"scripts": {
    "serve": "vue-cli-service serve",
    "one": "cross-env PROXY_ENV=one yarn serve",
    "two": "cross-env PROXY_ENV=two yarn serve",
    "three": "cross-env PROXY_ENV=three yarn serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```


```js
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const TIMEOUT = 40000

const service = axios.create({
  timeout: TIMEOUT,
  headers: { 'format': 'JSON' }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    store.commit('SHOW_LOADING')
    return config
  },
  error => {
    store.commit('HIDE_LOADING')
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    store.commit('HIDE_LOADING')
    const res = response.data

    // 业务失败时处理
    if (res.code !== 0) {
      Toast(res.msg)
      return Promise.reject(new Error(res.msg || "Error"))
    } else {
      return res
    }
  },
  error => {
    store.commit('HIDE_LOADING')
    Toast("网络正在开小差，请检查网络连接或稍后重试")
    return Promise.reject(error)
  }
)

/**
 * 封装 post 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} appkey appkey
 * @returns {Promise} 请求
 */
export function http (url, data = {}, appkey) {
  const config = {
    // 请求的服务器 URL
    url: `/router/rest?${url}`,
    // post
    method: 'post',
    data,
    // 后端要的头部自定义参数
    // 'content-type': contentType
    headers: { method: url, appkey }
  }
  return service(config)
}

export default service

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
