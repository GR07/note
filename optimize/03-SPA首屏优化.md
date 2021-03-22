# 理解

网页的显示 本质就是 向 web 服务器请求一个 html 文档


# 为什么SPA首屏加载慢

核心原因是入口文件相对较大



# 如何计算出首屏时间

```js
// 方案一：
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('first contentful painting');
});
// 方案二：
performance.getEntriesByName("first-contentful-paint")[0].startTime

// 返回一个 PerformancePaintTiming 实例
{
  name: "first-contentful-paint",
  entryType: "paint",
  startTime: 507.80000002123415,
  duration: 0,
};

```


# 解决方案



## 减小入口文件积

路由懒加载，把不同路由对应的组件分割成不同的代码块打包，待路由跳转时再去下载引入，使得入口文件变小。核心优化项。


## 静态资源本地缓存

采用 HTTP 缓存

HTTP 缓存规则分为两大类（强制缓存，对比缓存）设置 Cache-Control，Last-Modified，Etag 等响应头


## UI 框架按需引入

import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';


## 解决模块重复打包

公用模块提取单独打包 在 webpack 的 CommonsChunkPlugin 配置 minChunks: 3 次以上提取


## 图片资源压缩

图片资源虽然不在编码范围，但却是对页面性能影响最大的因素



## GZip 压缩

web 服务器和客户端（浏览器）必须共同支持 gzip

压缩效率非常高，通常可以达到 70% 的压缩率。

观察网络面板里面的 response header，如果看到 Content-Encoding: gizp 字段则表明 gzip 开启成功


cnmp i compression-webpack-plugin -D

```js
// webpack 配置
const CompressionPlugin = require('compression-webpack-plugin')

configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
        config.mode = 'production'
        return {
            plugins: [new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, //匹配文件名
                threshold: 10240, //对超过10k的数据进行压缩
                deleteOriginalAssets: false //是否删除原文件
            })]
        }
    }
// 服务器也要做配置，如果发送请求的浏览器支持 gzip，就发送给浏览器 gzip 格式的文件
```


## 服务端渲染 SSR



## css 放头部优先解析，要用 link 形式



## js 最好放到底部，因为会影响dom渲染