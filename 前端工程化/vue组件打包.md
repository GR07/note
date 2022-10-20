# 打包 vue 组件

## 项目结构
```js
|- /node_modules
|- /src
   |- Tag.vue
   |- main.js
|- index.html
|- webpack.config.js
|- package.json

```

## 初始化 Package.json
```js
// npm init -y
```

## 安装 Webpack && Loader && Plugin
```js
cnpm i webpack webpack-cli -D
cnpm i css-loader style-loader -D // 配置.css文件及样式使用
cnpm i file-loader -D // 配置特殊字体和图片使用
cnpm i vue-loader@15.7.0 vue vue-template-compiler -D // 处理.vue文件后缀 / 使用Vue语法 / 处理.vue文件里的template模板语法
cnpm i html-webpack-plugin@3.2.0 -D
```

## webpack.config.js
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        filename: "index.js",
        library: "Modal", // 配合使用 支持模块导出
        libraryTarget: "umd", // 配合使用 支持模块导出
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]  
            },
            {
                test: /\.(ttf|eot|woff|svg|woff2)/,
                use: "file-loader"
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]
}

```

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</html>

```

## main.js
```js
import Vue from 'vue'
import { Tag } from 'element-ui'; // 如果要脱离在类似官网单独使用需要加上，否则不用，因为vue项目中已经提前引入了
import 'element-ui/lib/theme-chalk/tag.css'; // 如果要脱离在类似官网单独使用需要加上，否则不用，因为vue项目中已经提前引入了
import customTag from "./Tag.vue"
Vue.component(Tag.name, Tag) // 如果要脱离在类似官网单独使用需要加上，否则不用，因为vue项目中已经提前引入了
export default customTag

```

## Tag.vue
```js
<template>
  <div class="Tag">
    {{ msg }}
    <el-tag type="success">标签二</el-tag>
  </div>
</template>

<script>
export default {
 name: 'Tag',
  data() {
    return {
        msg: "xxx",
    }
  },
  created() {
  },
  components: {},
  watch: {},
  methods: {
  }
}
</script>
<style scoped>

</style>


```


## 打包

配置完之后就可以使用npx webpack打包，可以看到有一个dist目录，该目录下存在一个index.js,  这个文件就是封装的Tag.vue文件, 

你可以将它引入到你的项目中，进行调用，该文件支持Es Module、CommonJs、AMD三种方式引入。
