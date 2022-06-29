# 原理

DLLPlugin 就是将包含大量复用模块且不会频繁更新的库进行编译，只需要编译一次，编译完成后存在指定的文件（这里可以称为动态链接库）中。在之后的构建过程中不会再对这些模块进行编译，而是直接使用 DllReferencePlugin 来引用动态链接库的代码（插入到我们的html页面中）。因此可以大大提高构建速度。一般会对常用的第三方模块使用这种方式，例如 react、react-dom、lodash 等等。只要这些模块不升级更新，这些动态链接库就不需要重新编译。



# 需要的插件

Webpack 已经内置了对动态链接库的支持，需要通过两个内置插件的配合使用。它们分别是：

- DllPlugin 插件：用于打包出一个个单独的动态链接库文件

- DllReferencePlugin 插件：用于在主配置文件中去引入用 DllPlugin 打包好的动态链接库文件

最后可以使用 AddAssetHtmlPlugin 将生成的动态链接库文件拷贝到出口文件夹下，然后 HTMLWebpackPlugin 就会自动的将脚本文件注入到生成的 html 文件中去



# 流程介绍

1. 配置 webpack.dll.js 针对第三方库打包

2. vue.config.js 中配置 plugin

3. html 中引入 dll 打包出来的 js 文件。（一般采用部署CDN的方式）



## 先编写一个配置文件专门用来编译生成动态链接库（使用 DllPlugin）

```js
// webpack.dll.js
// 由于项目中有很多大型的第三方库，类似three、echart等，所以进行了以下配置
const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        // 针对不同的库的大小进行划分，打了三个包，为啥不打成一个包？一个包那就太大了，你并不希望你的用户加载一个大型JS文件包而阻塞，影响页面性能。
        vuebundle: [
            'vue',
            'vue-router',
            'vuex',
        ],
        utils:[
            'lodash',
            'swiper',
            'lottie-web',
            'three',
        ],
        echarts:[
            'echarts/lib/echarts',
            "echarts/lib/chart/bar",
            "echarts/lib/chart/line",
            "echarts/lib/component/tooltip",
            "echarts/lib/component/title",
            "echarts/lib/component/legend",
        ]

    },
    output: {
        // 指定生成文件所在目录
        path: path.resolve(__dirname, './static/'),
        // 指定文件名
        filename: '[name].dll.js',
        // 存放动态链接库的全局变量名称，例如对应 vuebundle 来说就是 vuebundle_library
        // 这个名称需要与 DllPlugin 插件中的 name 属性值对应起来（之所以 _library 是为了防止全局变量冲突）
        library: '[name]_library'
    },
    plugins: [
        // 接入 DllPlugin
        new webpack.DllPlugin({
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            // 由于每次打包生产环境时会清空 dist 文件夹，因此这里我将它们存放在了 build 文件夹下
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: '[name]_library'
        })
    ]
}
```

## 编写配置文件用来打包项目（使用 DllReferencePlugin）

```js
// vue.config.js 或 // webpack.config.js
plugins: [
  // 注入环境变量
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
  }),
  // 可以自动加载模块，不必到处 import 或 require
  new webpack.ProvidePlugin({
    $: "zepto",
    Zepto: "zepto",
  }),
  // 反复打包后，dist目录会有很多历史打包文件，在每次构建前清理 /dist 文件夹。
  // 告诉 Webpack 使用了哪些动态链接库
  new DllReferencePlugin({
    manifest: require('./build/echarts-manifest.json'),
  }),
  // 告诉 Webpack 使用了哪些动态链接库
  new DllReferencePlugin({
    manifest: require('./build/utils-manifest.json'),
  }),
  // 告诉 Webpack 使用了哪些动态链接库
  new DllReferencePlugin({
    manifest: require('./build/vuebundle-manifest.json'),
  }),
  new BundleAnalyzerPlugin(),
]
```

## 在 index.html 文件中引入动态链接库

```js
// 由于动态链接库我们一般只编译一次，之后就不用编译，复用模块都被打包到了动态链接库中，因此入口的 index.js 文件中已经不包含这些模块了，所以要在 index.html 中单独引入。
// 引入了 DllPlugin。接下来配置 HTML：
<body>
  <div id="app"></div>
  <!-- built files will be auto injected -->
  <script type="text/javascript" src="http://localhost:3000/echarts.dll.js"></script>
  <script type="text/javascript" src="http://localhost:3000/utils.dll.js"></script>
  <script type="text/javascript" src="http://localhost:3000/vuebundle.dll.js"></script>
</body>
```


## 在 package.json 中添加两条指令：

```js
"scripts": {
    "build": "webpack --config webpack.config.js", // 打包项目
    // 生成动态链接库，只需要运行一次这个指令，以后打包项目不需要再执行这个指令
    "build:dll": "webpack --config webpack_dll.config.js"
}
```



## 优化

- add-asset-html-webpack-plugin

```js
// 因为打包的时候不能将动态链接库自动的存放到 dist 文件夹，也不能自动在 html 文件中引入动态链接库脚本。所以这时候 add-asset-html-webpack-plugin 就派上用场了。
// $ npm install add-asset-html-webpack-plugin -D
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
plugins: [
    ...,
    // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
    new AddAssetHtmlPlugin([
        {
            // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
            filepath: require.resolve(path.resolve(__dirname, 'public/vendor/lodash.dll.js')),
            // 文件输出目录
            outputPath: 'vendor',
            // 脚本或链接标记的公共路径
            publicPath: 'vendor'
        }
    ])
]
// 最后就可以删掉 index.html 文件中手动引入的脚本了
<script src="http://localhost:3000/vuebundle.dll.js"></script>
```



# 在 vue-cli3 中的配置

1. 新建一个webpack.dll.config.js
```js
// 定义常用对象
const path = require('path')
const webpack = require('webpack')
// clean-webpack-plugin 主要用于每次生成动态链接库时首先清空 vendor 目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录 一般定义为 public/vendor
const dllPath = 'public/vendor'

module.exports = {
  // 定义提取哪些库/依赖
  entry: {
    // 该对象中，键名定义生成生成文件的前缀，键值为数组类型是依赖名
    // manifest.json 这个文件是用于让 DllReferencePlugin 能够映射到相应的依赖上
    vue: ["vue", "vue-router", "vuex", 'axios'], // vue-manifest.json
    antd: ["ant-design-vue"], // antd-manifest.json
    echarts: ["echarts"], // echarts-manifest.json
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    // 定义插件
    new webpack.DllPlugin({
      // manifest.json 文件的 绝对路径（输出文件）
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
```
2. DllReferencePlugin 配置

```js
// 此插件配置在 webpack 的主配置文件中，此插件会根据描述文件引用依赖到需要的预编译的依赖中
module.exports = {

  configureWebpack: config => {
    plugins: [
        // 避免在公共区域重复编译依赖
    	new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(`./public/vendor/vue-manifest.json`)
        })
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(`./public/vendor/antd-manifest.json`)
        })
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(`./public/vendor/echarts-manifest.json`)
        })
    ]
  }
}

```



## DllReferencePlugin 循环优化

DllReferencePlugin 插件配置时代码存在重复，进行优化。 在 webpack.dll.config.js 文件中我们其实可以拿到所有的 name，即可以对其进行遍历生成。

```js
// vue.config.js
const DllConfig = require('./webpack.dll.config')

module.exports = {

    configureWebpack: config => {
    	let plugins = [
        	...
        ]
        // 避免在公共区域重复编译依赖
        Object.keys(DllConfig.entry).forEach(key=>{
          plugins.push(new webpack.DllReferencePlugin({
              context: process.cwd(),
              manifest: require(`./public/vendor/${key}-manifest.json`)
          }))
        })
        // 整合插件
    	config.plugins = [...config.plugins, ...plugins]
    }
    
}

```


## 引入优化

使用 add-asset-html-webpack-plugin 自动引入资源库

```js
module.exports = {

  configureWebpack: config => {
    plugins: [
        ...
        new HtmlWebpackPlugin({
          title: 'My Project',
          template: 'public/index.html',
          favicon: 'public/logo.png'
        })
        // 迁移到 webpack 4+ 后，需要在 HtmlWebpackPlugin 之后应用该插件
        new AddAssetHtmlPlugin({
          // dll 文件的位置，配置 *.js 可以使插件加载目录下的所有资源库 js 文件
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // script 标签生成的 src 路径 dll 引用路径，请使用 绝对路径！！！
          publicPath: '/vendor',
          // dll最终输出的目录
          outputPath: './vendor'
        })
    ]
  }
  
}

```



# 以上 vue-cli 的整合配置展示

```js
// vue.config.js
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DllConfig = require('./webpack.dll.config')

module.exports = {
  ...
  configureWebpack: config => {
  
    let plugins = [
      new HtmlWebpackPlugin({
        title: 'My Project',
        template: 'public/index.html',
        favicon: 'public/logo.png'
      })
    ]
    
    if (process.env.NODE_ENV === 'production') {
      // 将生成的 dll 文件注入到 生成的 html 模板中
      plugins.push(new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: '/vendor',
        // dll最终输出的目录
        outputPath: './vendor'
      }))
      // 避免在公共区域重复编译依赖
      Object.keys(DllConfig.entry).forEach(key=>{
        plugins.push(new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(`./public/vendor/${key}-manifest.json`)
        }))
      })
    }
    
    // 整合插件
    config.plugins = [...config.plugins, ...plugins]
  }
  
}

```

```js
// webpack.dll.config.js
// 定义常用对象
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  // 需要提取的库文件
  entry: {
    vue: ["vue", "vue-router", "vuex", 'axios'],
    antd: ["ant-design-vue"],
    echarts: ["echarts"],
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    // 定义插件
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}

```



webpack常见的优化方式，优化路径查找、设置缓存、happypack以及dllplugin，前两项vue-cli已经帮我们做了一些，而happypack由于不和vue兼容，导致无法接入，dllplugin通过单独提取第三方库，取得了明显优化。


webpack优化方式总结：

1、优化模块查找路径
2、剔除不必要的无用的模块
3、设置缓存：缓存loader的执行结果(cacheDirectory/cache-loader)
4、设置多线程：HappyPack/thread-loader
5、dllplugin提取第三方库

当然，这是针对开发的优化，如果是针对部署上的优化呢？我们可以设置splitchunk、按需加载、部署CDN等，这里就不展开了