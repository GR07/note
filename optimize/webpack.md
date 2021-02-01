## 概念


### 入口 entry

表示 webpack 选取哪个文件作为打包的起点。

进入起点文件后，webpack能自己找到之后的模块之间依赖。

```js
module.exports = {
    entry: './path/to/my/entry/file.js'
};
```


### 输出 output

告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。

主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

```js
// 引入是因为这里需要 node.js 的 path 模块操作文件路径
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
};
```


### loader

因为 webpack 自身只能理解 JavaScript 和 JSON 文件。

loader 让 webpack 能够去处理其他类型的文件。

并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。


#### loader 有两个属性：

1. test：哪些文件会被转换。

2. use：表示进行转换时，应该使用哪个 loader。

##### 注意：在 webpack 配置中定义 rules 时，要定义在 module.rules 而不是 rules 中。

```js
module.exports = {
  module: {
    rules: [
        // 两个必须属性：test 和 use
        // 嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 使用 raw-loader 转换一下。”
        // 使用正则表达式匹配文件时，你不要为它添加引号。
        { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

```



### 插件 plugin

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。

包括：打包优化，资源管理，注入环境变量。

#### 使用方法

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。

多数插件可以通过选项(option)自定义。

你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

webpack 提供许多开箱可用的插件！(https://v4.webpack.docschina.org/plugins)

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```



### 模式 mode

development / production / none  默认值: production

设置 mode 参数，启用 webpack 内置在相应环境下的优化。

```js
module.exports = {
  mode: 'none' // 退出任何预设优化选项
};
```





## 命令

### npx webpack 

默认去找 webpack.config.js 文件

### npx webpack --config abc.config.js

可以自定义任何名称的配置文件（对于需要拆分成多个文件的复杂配置是非常有用）


### npm scripts 中添加一个 npm 命令

```js
// 现在，可以使用 npm run build 命令，来替代我们之前使用的 npx 命令。
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
},
```

### 参数

通过在 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack

例如：npm run build -- --colors。




## 对比

grunt和gulp等工具来处理资源，使其从/src文件夹移动到/dist或/build目录中。

webpack 只处理依赖图中的资源

webpack最出色的功能之一就是，除了处理JavaScript，还可以通过loader添加其他任何类型的文件



## 常用loader

url-loader / file-loader

处理图片 / 音频 / 视频 / 字体


结果：url-loader 包含 file-loader，只需要用 url-loader 即可

如果页面图片较多，发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。
url-loader会将引入的图片编码，生成dataURl并将其打包到文件中，最终只需要引入这个dataURL就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy



## 常用插件

htmlWebpackPlugin 

创建了一个全新的 html文件，所有的 bundle 会自动添加到 html 中

解决的问题：当改了打包出口文件名后，可以动态把打包后的文件自动添加到 html 中


clean-webpack-plugin

清理 /dist 文件夹

解决的问题：反复打包后，dist目录会有很多历史打包文件，在每次构建前清理 /dist 文件夹。

使用注意：
```js
// 官方文档是错误的示范，需要解构一下，不需传参直接实例化即可。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin()
]
```



打包路径配置：

因为默认打包后文件的路径是 /js/asdasdasd.js

需要把 / 去掉 js/asadasd.js
```javascript
// vue.config.js 文件
module.exports = {
  publicPath: "./"
};

```



```javascript
chainWebpack: config => {
        config.entry('main').add('babel-polyfill');
        config.plugin('html').tap(args => {
            args[0].cdn = {
                js: [
                    '//api.map.baidu.com/api?v=2.0&ak=VybvSG3RqpGQzp6GwlzNOmiq&s=1',
                    '//api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js'
                ]
            };
            return args;
        })
        config.resolve.alias.set("@", path.resolve(__dirname, "src"));
        config.resolve.alias.set("@public", path.resolve(__dirname, "public"));
        config.resolve.alias.set(
            "@config",
            path.resolve(__dirname, "src/config")
        );
        config.resolve.alias.set("@api", path.resolve(__dirname, "src/api"));
        config.resolve.alias.set(
            "@com",
            path.resolve(__dirname, "src/components")
        );
        config.resolve.alias.set(
            "@store-m",
            path.resolve(__dirname, "src/store/modules")
        );

        /**** svg图标处理 添加压缩loader "image-webpack-loader" */

        // 修改svg-loader 不包含icons列表
        config.module
            .rule("svg")
            .exclude.add(path.resolve(__dirname, "src/assets/img/icons"))
            .end()
            .use("image-webpack")
            .loader("image-webpack-loader")
            .tap((options = {}) =>
                Object.assign(options, {
                    disable: false
                })
            )
            .end();
        // 兼容 ie ES6语法 使用 babel 处理 vue-awesome-countdown/ element-ui
        config.module
            .rule("plugin")
            .test(/\.js$/)
            .include.add(path.resolve("node_modules/_vue-awesome-countdown@1.0.26@vue-awesome-countdown"))
            .add(path.resolve("node_modules/_element-ui@2.13.1@element-ui/packages"))
            .add(path.resolve("node_modules/_element-ui@2.13.1@element-ui/src"))
            .end()
            .use("babel")
            .loader('babel-loader')
            .end()
    },

```