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

注意：只有异步加载的模块才会单独打出一个文件，同步引入的会混合在父包里

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

因为 webpack 自身只能理解 JavaScript 和 JSON 文件，进行打包。

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



## source-map

webpack中的sourcemap的基本类型包括：eval cheap moudule inline source-map

其他的类型都是根据这5个基本类型组合而来。

#### eval

会将每一个module模块，执行eval，执行后不会生成sourcemap文件，仅仅是在每一个模块后，增加sourceURL来关联模块处理前后的对应关系。因此打包的速度很快。

#### source-map

会为每一个打包后的模块生成独立的soucemap文件，打包速度很慢。

#### inline

与source-map不同，增加inline属性后，不会生成独立的.map文件，而是将.map文件以dataURL的形式插入打包后的文件。

#### cheap

在打包后同样会为每一个模块生成.map文件，但是与source-map的区别在于cheap生成的.map文件会忽略原始代码中的列信息。也不会有loader模块之间对应的sourcemap

loader模块之间对应的sourcemap是什么：比如css是需要loader处理的，如果这个css出问题了，就不会定位到原始代码位置。

#### module

包含了loader模块之间的sourcemap


#### 如何选择sourcemap

在开发环境使用：devtool: eval-cheap-module-source-map

在生产环境使用：devtool: cheap-module-source-map 或者 注释掉

##### 原因：

1.首先列信息是没有意义的，只要有行信息就能完整的建立打包前后代码之间的依赖关系。

因此开发环境还是生产环境，都会选择增加cheap基本类型来忽略列信息。


2.其次，不管在生产环境还是开发环境，我们都需要定位问题到最最原始的资源，因此，不能忽略module属性


3.再次我们希望通过生成.map文件的形式，因此要增加source-map属性


eval-source-map组合使用是指将.map以DataURL的形式引入到打包好的模块中，类似于inline属性的效果，

我们在生产中，使用eval-source-map会使打包后的文件太大，因此在生产环境中不会使用eval-source-map。但是因为eval的rebuild速度快，因此我们可以在本地环境中增加eval属性。




## 热更新 webpack-dev-server


### watch

观察依赖图中的所有文件，如果其中一个文件被更新，代码将被自动重新编译打包，所以你不必手动run build

存在问题：虽然会重新打包，但是不会刷新页面
```js
"scripts": {
    "watch": "webpack --watch"
}
```

### webpack-dev-server

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时刷新页面

webpack-dev-server 是 webpack-dev-middleware + express 的集成





## tree shaking 树摇算法

指的是移除 JavaScript 上下文中的未引用代码（import / export）

将文件标记为无副作用 "sideEffects": false 

最后用 uglifyjs 压缩插件删掉无用代码

package.json 的 "sideEffects" 属性来实现
```js
{
  "name": "your-project",
  "sideEffects": false
}
```

### uglifyjs 集成的压缩插件

从 webpack 4 开始，也可以通过 "mode" 配置选项轻松切换到压缩输出，只需设置为 "production"。

```js
module.exports = {
    entry: './src/index.js',
    mode: "production"
}

```
npm run build


## 环境变量

许多项目插件通过与 process.env.NODE_ENV 环境变量关联，以决定应该引用哪些内容及针对环境进行代码优化。
```js
mode: "production"
```

NODE_ENV 是 nodejs在执行时的环境变量，webpack在运行构建期间也可以访问这个变量，所以我们可以在dev和prod下配置相应的环境变量。

环境变量可以通过 DefinePlugin 传入给运行程序（页面可以访问）
```js
new webpack.DefinePlugin({
    'process.env.ASSET_PATH': JSON.stringify('asd')
})
```
方法3(推荐,只适用于vue-cli):
配置vuecli的环境变量,在项目根目录新建.env.dev文件,内容为:

NODE_ENV=production
VUE_APP_ENV=dev
再新建一个.env.production,内容为:

NODE_ENV=production
VUE_APP_ENV=production
package.json中scripts内配置:

"builddev": "vue-cli-service build --mode dev",
"buildprod": "vue-cli-service build --mode production",
然后判断环境变量得到对应的baseurl值:    baseurl:process.env.VUE_APP_ENV==='production'?'http://prod.api.com':'http://test.api.com'

推荐原因:这样配置不会使打包文件体积增大,前面的方式打包后的文件都比较大,因为不是生产环境,代码不会压缩,警告和提示语也被打包进去了等等,这些都是不适合生产环境的

注意文件中NODE_ENV=production要加上,不然NODE_ENV就是默认的开发环境,值为delelopment



## 代码分离

### 原因

1.分离打包到单独文件，然后就可以按需加载这些文件

2.避免2个模块之间重复打包混入相同的代码


常用的代码分离有三种方式（推荐3）

1.entry入口文件手动分离
```js
mudule.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    }
}
```

2.手动分离后自然会产生重复引入的组件，再用 SplitChunksPlugin 去重和分离
```js
mudule.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    optimization: {
        // 代码分离后把重复引入的模块去重，并分离出来 (vendors~another~app.bundle.js)
        // 注意别瞎几把搞它，官方默认配置即可
        splitChunks: {}
    }
}
```

3.动态导入 import （效果上 = 1 + 2）
```js
if (process.env.NODE_ENV !== 'production') {
    console.log(`这是开发环境${process.env.NODE_ENV}`);
}
async function getComponent() {

    var element = document.createElement('div');
    // 注意这个注释 /* webpackChunkName */ 是有用的
    // 这样是为了打包分离后给模块命名为语义化的名称，而不会是 id 的形式。
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

getComponent().then(dom => {
    document.body.appendChild(dom);
})
```

## 提取引导模板

引导模板是什么？

webpack中关联模块映射关系的代码


为什么要把他提取单独打包？

因为低版本webpack 每次打包都会更改引导模板，所以导致包含引导模板的模块的hash会变。



## 模块标识

兜底低版本webpack更新文件后，不相关文件的hash会变
```javascript
const webpack = require('webpack');
plugins: [
    new webpack.HashedModuleIdsPlugin()
],
```




## runtime 运行时代码

import('abc').then(res=>{})这种异步加载的代码，在webpack中即为运行时代码。


## 懒加载

首先要知道无论再怎么变，web本质上是浏览器向服务器请求一个html文档，

服务器上的资源又分为两种：

1.请求的html中引入的资源（script、css）

2.请求的html中未引入的资源，这些未引入的资源就是懒加载的资源。


### 那么为什么部分资源要懒加载

可以加快应用的初始加载速度，减轻了它的总体体积，因为某些资源可能永远不会被加载。



根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化。



## 分离css文件

不分离的时候，打包后css代码会混合在js代码中
```js
// 例如
___CSS_LOADER_EXPORT___.push([module.i, \"body {\\r\\n    color: blue;\\r\\n}\", \"\"]);
```

如何分离

使用 npm install --save-dev mini-css-extract-plugin

主要是为了抽离css样式，防止将样式打包在js中引起页面样式加载错乱的现象。




## 打包分析工具

注意：图示里表示的是所有打包的文件，包括懒加载的文件（只分析js文件）
```js
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
plugins: [
    new BundleAnalyzerPlugin()
  ],
```


## 加载 polyfill

这种方式优先考虑正确性，而不考虑 bundle 体积大小。为了安全和可靠，polyfill/shim 必须运行于所有其他代码之前，而且需要同步加载，或者说，需要在所有 polyfill/shim 加载之后，再去加载所有应用程序代码。 社区中存在许多误解，即现代浏览器“不需要”polyfill，或者 polyfill/shim 仅用于添加缺失功能 - 实际上，它们通常用于修复损坏实现(repair broken implementation)，即使是在最现代的浏览器中，也会出现这种情况。 因此，最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，尽管这会导致额外的 bundle 体积成本。


## 打包命令

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
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }) // cleanStaleWebpackAssets: false 告诉插件删除文件的同时不要删除没有改变的文件
]
```



## 集成typescript


### 安装

安装 typescript 和 tsloader

npm install --save-dev typescript ts-loader


### 新增配置文件

根目录下新增配置文件 tsconfig.json
```js
// 设置一个基本的配置，来支持 JSX，并将 TypeScript 编译到 ES5
{
    "compilerOptions": {
        "outDir": "./dist/",
        "noImplicitAny": true,
        "module": "es6",
        "target": "es5",
        "jsx": "react",
        "allowJs": true
    }
}
```

### 最后配置 webpack 处理 TypeScript





## 性能优化


### 拆分css文件

mini-css-extract-plugin
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
plugins: [
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: 'css/[name].[contenthash].css',
      chunkFilename: "css/[id].[contenthash].css"
    }),
],
rules: [
    {
        test: /\.css$/,
        use: [
            // 用了这个就不可以不用style-loader，且必须在css-loader上面
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader"
            }
        ]
    }
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