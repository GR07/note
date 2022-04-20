可以参考的配置：https://github.com/trsoliu/vue-cli3.x-configure/blob/master/vue.config.js
# 查看webpack配置文件
```js
// 并输出到根目录下 webpack.config.production.js 文件
// production 是指定生产模式下
npx vue-cli-service inspect --mode production >> webpack.config.production.js

```



# 浏览器的兼容问题


## .browserslist

在vue官方脚手架中，browserslist 字段会被 @babel/preset-env 和 Autoprefixer 插件使用，用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

两种使用方式：

一：独立 .browserslist 文件

二：package.json 文件（推荐）
```json
{
  "browserslist": [
    "> 1%", // 代表着全球超过1%人使用的浏览器
    "last 2 versions", // 表示所有浏览器兼容到最后两个版本
    "not ie <= 8" // 表示IE浏览器版本大于8（实则用npx browserslist 跑出来不包含IE9 ）
  ]
}
```


## Polyfill


一个默认的 Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill。

注：当使用 Vue CLI 来构建一个项目时，推荐给 @vue/babel-preset-app 传入 useBuiltIns: false 选项。
这能够确保你的库或是组件不包含不必要的 polyfills。


### 自动检测需要的 polyfill: 

默认情况下，会把 useBuiltIns: 'usage' 传递给 @babel/preset-env 插件。

优点：确保了最终包里 polyfill 数量的最小化。

缺点：这也意味着如果其中一个依赖需要特殊的 polyfill，默认情况下 Babel 无法将其检测出来。


#### 解决缺点：三种方案

一：如果该依赖基于一个目标环境不支持的 ES 版本撰写: 

将其添加到 vue.config.js 中的 transpileDependencies 选项。这会为该依赖同时开启语法转换和根据使用情况检测 polyfill。

（注：@vue/cli-plugin-babel 插件已经包含了 @babel/polyfill）

```js

// vue.config.js
module.exports = {
  transpileDependencies: [
    // 可以是字符串或正则表达式
    'my-dep', // 在 node_modules 哪个文件夹里，比如 my-dep
    /other-dep/
  ]
}
// cache-loader 默认开启，被缓存的东西存储在 node_modules/.cache/babel-loader。

// thread-loader 会在多核机器上默认开启。你可以在 vue.config.js 中设置 parallel: false 将其关闭。
```


二：如果显式地列出了需要的 polyfill: 

可以使用 @vue/babel-preset-app 的 polyfills 选项预包含所需要的 polyfill。
```JS
// 推荐以这种方式添加 polyfill 而不是在源代码中直接导入它们
// 因为如果这里列出的 polyfill 在 browserslist 的目标中不需要，则它会被自动排除。
// babel.config.js
module.exports = {
  presets: [
    ["@vue/app", {
      polyfills: [
        "es.promise",
        "es.symbol"
      ]
    }]
  ]
};
```

三：使用了 ES6+ 特性且没有显式地列出需要的 polyfill

请使用 useBuiltIns: 'entry'
然后在入口文件添加 import 'core-js/stable'; import 'regenerator-runtime/runtime';
这会根据 browserslist 目标导入所有 polyfill。
但是因为包含了一些没有用到的 polyfill 所以最终的包大小可能会增加


```js
// 需要配合始终开启的 CORS 进行加载。
// 这意味着你的服务器必须返回诸如 Access-Control-Allow-Origin: * 的有效的 CORS 头
<script type="module">
```




# <link rel="preload">

用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload 
例如 chunk-vendors.js / main.js

默认情况下，一个 Vue CLI 应用会为所有初始化渲染需要的文件自动生成 preload 提示



# <link rel="prefetch">

用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容。（指：import按需加载的文件）

默认情况下，一个 Vue CLI 应用会为所有作为 async chunk 生成的 JavaScript 文件自动生成 prefetch

注：当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：
```js
import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
```

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
}
```


# 静态资源

静态资源可以通过两种方式进行处理：

## 1.在 js 中被导入 或者在 css 中通过相对路径被引用。

这类引用会被 webpack 处理。


## 2.public 目录下， 或者通过绝对路径被引用。

这类资源将会直接被拷贝，而不会经过 webpack 的处理。


## 可以通过 chainWebpack 调整内联文件的大小限制

```js
// 下列代码会将其限制设置为 10kb
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
        .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 10240 }))
  }
}
```


# public 文件夹

任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。

public 目录提供的是一个应急手段，当你通过绝对路径引用它时，留意应用将会部署到哪里。

如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀


在模板中使用 public 目录静态资源
```js
data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
```
```html
<img :src="`${publicPath}my-image.png`">
```


# PostCSS

Vue CLI 内部使用了 PostCSS, 默认开启了 autoprefixer

## 作用：

浏览器兼容前缀 / 模块css命名




# 预处理器 Loader 配置 loaderOptions: {}

这样做比使用 chainWebpack 手动指定 loader 更推荐，因为这些选项需要应用在使用了相应 loader 的多个地方。

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
```



# 修改 webpack 配置


## configureWebpack （被 webpack-merge 合并）

调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象。

该对象将会被 webpack-merge 合并入最终的 webpack 配置。

```js
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```
如果想直接修改，提供一个函数，在函数内，可以直接修改配置，或者返回一个将会被合并的对象
```js
// vue.config.js
module.exports = {
  // 第一个参数 config 是接收到的已经解析好的配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```


## webpack-chain

Vue CLI 内部的 webpack 配置是通过 webpack-chain 库维护的。

webpack-chain 库是 webpack 原始配置的上层抽象。


### 常见的例子


### 添加一个新的 Loader
```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      // 你还可以再添加一个 loader
      .use('other-loader')
        .loader('other-loader')
        .end()
  }
}

```

### 替换一个已有的 Loader

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}
```

### 修改插件

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* 传递给 html-webpack-plugin's 构造函数的新参数 */]
      })
  }
}

// 改变 html-webpack-plugin index.html 的默认路径
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 例如 改为/Users/username/proj/app/templates/index.html
        args[0].template = '/Users/username/proj/app/templates/index.html'
        return args
      })
  }
}
```


# 模式和环境变量

## 环境文件

### 项目根目录中放置下列文件来指定环境变量
```js
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入 常规项目只用这种 
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

### 环境文件只包含环境变量的 “键 = 值”
```js
// 以下那种都可以 只要以 VUE_APP_ 开头即可，值叫什么都行
VUE_APP_NOT_SECRET_CODE = some_value
VUE_APP_BASE_API = '/dev-api'
VUE_APP_API_MODE = prod
VUE_APP_API_MODE = prod

// 请注意，只有 NODE_ENV，BASE_URL 和 以 VUE_APP_ 开头的变量将通过 webpack.DefinePlugin 静态地嵌入到客户端的代码中。

// 变量将会对 vue-cli-service 的所有命令、插件和依赖可用。
```

### 环境文件加载优先级：

一个特定模式准备的环境文件 (例如 .env.production) 将会比一般的环境文件 (例如 .env) 拥有更高的优先级。

### 客户端代码中访问环境变量
```js
console.log(process.env.VUE_APP_SECRET)
```

### 另外的2种

BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。(例如html 的图标使用)

NODE_ENV - 会是 "development"、"production" 或 "test" 中的一个。具体的值取决于应用运行的模式。

当你运行 vue-cli-service build 命令时，无论你要部署到哪个环境，应该始终把 NODE_ENV 设置为 "production" 来获取可用于部署的应用程序。



# 构建模式

运行 vue-cli-service build 时，你可以通过 --target 选项指定不同的构建目标。


## 应用模式

应用模式是默认的模式。

· index.html 会带有注入的资源和 resource hint
· 第三方库会被分到一个独立包以便更好的缓存
· 小于 4kb 的静态资源会被内联在 JavaScript 中
· public 中的静态资源会被复制到输出目录中


## 库模式

待补充 没搞过

```js
const path = require("path");
// 打包分析
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 引用全局变量
        prependData: `@import "@/assets/styles/common.scss";`,
      },
    },
    // 禁止css顺序检查（解决有顺序警告问题）https://github.com/vuejs/vue-cli/issues/3771
    extract: process.env.NODE_ENV === "production" ? { ignoreOrder: true, } : false,
  },
  // 关闭SourceMap
  productionSourceMap: false,
  // 静态文件路径
  publicPath: process.env.VUE_APP_API_MODE === "prod" ? "https://qdoss.ininin.com/" : process.env.VUE_APP_API_MODE === "test" ? "https://test-qdoss.ininin.com/" : "/",
  configureWebpack: {
    externals: {
      mathjs: "math",
      vue: "Vue",
      "element-ui": "ElementUI"
    },
  },
  chainWebpack(config) {
    // 代码分割规则
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        elementUI: {
          name: "chunk-elementUI", // elementUI 独立拆包
          priority: 20, // 权重优先级需要大于libs / app 否则会被打包进libs或app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 目录
        },
        commons: {
          name: "chunk-commons",
          test: path.join(__dirname, "src/components"), // src/components 里组件独立拆包
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    config.optimization.runtimeChunk("single"); // runtime 拆包
    config
      .plugin("webpack-bundle-analyzer")
      .use(BundleAnalyzerPlugin);
  },
};

```
