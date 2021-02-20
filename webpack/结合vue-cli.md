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
    [
        '@vue/app', 
        {
            polyfills: [
                'es6.promise',
                'es6.symbol'
            ]
        }
    ]
  ]
}
```

三：使用了 ES6+ 特性且没有显式地列出需要的 polyfill

请使用 useBuiltIns: 'entry'
然后在入口文件添加 import 'core-js/stable'; import 'regenerator-runtime/runtime';
这会根据 browserslist 目标导入所有 polyfill。
但是因为包含了一些没有用到的 polyfill 所以最终的包大小可能会增加



<script type="module"> 需要配合始终开启的 CORS 进行加载。这意味着你的服务器必须返回诸如 Access-Control-Allow-Origin: * 的有效的 CORS 头