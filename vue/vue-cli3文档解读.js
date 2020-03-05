// 安装插件方式:

// vue add 可以安装vue-cli的插件

// npm 普通的npm包还是需要npm安装



// public/index.html 

// index.html 是一个会被 html-webpack-plugin 处理的模板, 在构建过程中, 资源链接会被自动注入,

// 但是你可以使用 lodash template 语法插入内容.

// <%= VALUE %> 用来做不转义插值；
// <%- VALUE %> 用来做 HTML 转义插值；
// <% expression %> 用来描述 JavaScript 流程控制



// 两种方式处理静态资源

// 在 JavaScript 被导入或在 template/CSS 中通过相对路径被引用。这类引用会被 webpack 处理。

// 放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

url-loader 将小于 4kb 的资源内联，以减少 HTTP 请求的数量。



// 通过 chainWebpack 调整内联文件的大小限制。 10k以内的文件会内联一起打包 减少请求.
// 限制设置为 10kb：
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  }
}

module.exports = {
  publicPath:  指向项目在服务器的目录//
  outputDir: 打包的目录
  assetsDir: 静态资源存放目录
  filenameHashing: 控制缓存 区别打包后的版本
}

