# HappyPack 开启多进程打包

- 已弃用

从 webpack4 发表之后，happypack已经不维护了，退出历史舞台了，有新的 thread-loader 代替。

另外，如果你只是单纯地想加快编译打包速度的话，不如上 dllplugin 比 thread-loader 快。

vue cli3脚手架默认采用了 thread-loader（与happypack作用相同），happypack 也不支持 vue-loader




# 原理

整个 Webpack 构建流程中，最耗时的流程可能就是 loader 对文件的转换操作了，因为要转换的文件数据巨多，而且是单线程所以这些转换操作都只能一个个文件挨着处理。HappyPack 的核心原理就是把这部分任务分解到多个子进程去并行处理，从而减少了总的构建时间。



# 配置使用

```js
module: {
  rules: [
    //js
    {
      test: /\.js$/,
      // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例处理
      use: ['happypack/loader?id=babel'],
      include: srcPath,
      exclude: /node_modules/
    },
    // 图片
    {

    }
  ]
},
plugins: [
  // 每实例化一个 HappyPack 其实就是告诉 HappyPack 核心调度器如何通过一系列 Loader 去转换一类文件，并且可以指定如何给这类转换操作分配子进程。
  // 核心调度器会把一个个任务分配给当前空闲的子进程，子进程处理完毕后把结果发送给核心调度器，它们之间的数据交换是通过进程间通信 API 实现的。核心调度器收到来自子进程处理完毕的结果后会通知 Webpack 该文件处理完毕。
  new HappyPack({
    // 用唯一的标识符 id 代表当前的 实例 有哦你过来处理哪一类特定文件
    id: 'babel',
    // 如何处理 .js 文件，用法和 loader 配置一样
    loaders: ['babel-loader?cacheDirectory'],
  }),
],
```
