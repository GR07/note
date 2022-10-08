# 部署

vue 项目在打包构建后，是生成一系列的静态文件，常规布署只需要把这个目录上传至目标服务器即可。

自动化，镜像，容器，流水线布署，本质也是将这套逻辑抽象，隔离，用程序来代替重复性的劳动



# 404 问题


## 场景

vue项目在本地时运行正常，但部署到服务器中，刷新页面，出现了404错误。


## 定位问题

HTTP 404 错误意味着链接指向的资源不存在。

为什么不存在？且为什么只有 history 模式下会出现这个问题？


## history 模式下的问题

Vue 是单页应用

而 单页应用 所有用户交互是通过 js 动态重写替换当前 dom，不管我们应用有多少页面，构建物都只会产出一个index.html


看一下 nginx 配置

在地址栏输入 www.xxx.com 时，这时会打开我们 dist 目录下的 index.html 文件。

然后跳转路由进入到 www.xxx.com/login，在这个页面刷新的时候，nginx location 是没有相关配置的，所以就会出现 404 的情况。
```js
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
  }
}
```



## 为什么 hash 模式下没问题

hash 模式是用符号 # 表示的，如 website.com/#/login, hash 的值为 #/login

hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，所以请求地址还是 website.com，因此改变 hash 不会重新加载页面

如 website.com/#/login 只有 website.com 会被包含在请求中 ，因此对于服务端来说，即使没有配置 location，也不会返回 404 错误



# 解决方案

只需要配置将任意页面都重定向到 index.html，把路由交由前端处理。

对 nginx 配置文件 .conf 修改，添加 try_files $uri $uri/ /index.html

```js
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
    try_files $uri $uri/ /index.html;
  }
}
```
修改完配置文件后记得配置的更新 nginx -s reload

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```