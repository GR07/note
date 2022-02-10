
高效地更新所有这些 html DOM 节点会是比较困难的，不过所幸你不必手动完成这个工作。

在以下这两种情况下，Vue 都会自动保持页面的更新，即便 blogTitle 发生了改变。

```js
// template 模板
<h1>{{ blogTitle }}</h1>
```

```js
// render 渲染函数
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```



# render函数是什么

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。

“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

render 和 template模板 都是用来返回虚拟dom 最终创建 html

render函数是组件渲染的重要核心，它跟template模板开发一样，只不过是另一种形式开发，但render比template模板更接近编译器，这样能让Vue编译时少转换一次。


# main.js 中的 render

我们都知道Vue项目入口文件main.js里面有个render函数长下面这样，是将项目的App根组件，挂载到根实例上通过render渲染。

```js
// main.js
new Vue({
  render: h => h(App)
}).$mount('#app')
```

# render函数的使用

- 函数返回值是一个 VNode 虚拟dom

- 函数的参数是一个createElement函数

    - createElement返回值也是一个 VNode 虚拟dom 

    - createElement函数的参数有三个

      1. {String | Object | Function} 
      
        - 一个 HTML 标签名、组件选项对象，或者 resolve 了上述任何一种的一个 async 函数。必填项。

      2. {Object}

        - 一个与模板中 attribute 对应的数据对象。可选。

      3. {String | Array}
      
        - 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成 “文本虚拟节点” 。可选。

```js
// index.js
export default {
  data() {
    return {
      name: '姓名'
    }
  },
  render(createElement) {
    // @returns {VNode}
    return createElement(
      // {String | Object | Function}
      "div",
      // {Object}
      { attrs: {title: "姓名"} },
      // {String | Array}
      [
        createElement("span", null, "姓名")
      ]
    )
  }
}

import config from "./index.js"
Vue.component("test", config)
```


# template 与 render 写法

- Vue 的 template 模板实际上通过 Vue.compile() 被编译成了渲染函数，这是一个实现细节。

```js
// template
<template>
  <div>
    <h1 v-if="num == 1"></h1>
    <h2 v-if="num == 2"></h2>
    <h3 v-if="num == 3"></h3>
    <h4 v-if="num == 4"></h4>
    <h5 v-if="num == 5"></h5>
    <h6 v-if="num == 6"></h6>
  </div>
</template>
```
```js
// render
export default {
  props: {
    num: {
      type: Number,
      required: true
    }
  },
  render: function (createElement) {
    return createElement(
      'h' + this.num,
    )
  }
}
```



# 什么是 JSX

- jsx 是 js 和 XML 结合的一种格式，是 js 的扩展语法。js 在解析 jsx 时会先创建虚拟 DOM，jsx 最后会被编译为 js 代码执行。

- jsx 的出现是为了解决 render 函数（createElement函数）层级嵌套可读性较差，jsx 相当于是 createElement 的语法糖，可以直接使用 template 模板那种格式在 render 函数里写。

```js
// jsx 写法
export default {
  data() {
    return {
      name: "前端娱乐圈",
      dataList: {
        title: "前端娱乐圈",
        href: "www.baidu.com"
      }
    }
  },
  render() {
    return <div onClick={this.xxx} {...{attrs: this.dataList}}>{ this.name }</div>
  }
}
```

- 函数式组件

如果不需要生命周期、状态管理，我们可以将组件标记为 functional，这意味它无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)。一个函数式组件就像这样：

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```


# JSX 和 Render 函数的区别

除了写法不一样外，没什么不同，属性都是遵循 Vue 文档。





# 兼容性配置

- 如果你的项目是Webpack搭建，babel@6的情况

  1. npm i @babel/core @vue/babel-preset-jsx babel-loader

  2. 根目录.babelrc文件

    ```js
    {
      "plugins": ["transform-vue-jsx"]
    }
    ```

  3. webpack.config.js

    ```js
    {
      test: /\.js/,
      use: "babel-loader"
    }
    ```

- 如果你的项目是Webpack搭建，babel@7的情况

  1. npm i @babel/core @vue/babel-preset-jsx babel-loader @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

  2. 根目录.babelrc文件

    ```js
    {
      "presets": ["@vue/babel-preset-jsx"]
    }
    ```

  3. webpack.config.js

    ```js
    {
      test: /\.js/,
      use: "babel-loader"
    }
    ```

- 如果你的项目是Vue-cli

  最新版本的cli是会默认支持JSX语法的，如果你的版本较老请跟上面一样的配置。

  1. npm i @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props

  2. babel.config.js

    ```js
    module.exports = {
      presets: [
        '@vue/cli-plugin-babel/preset'
      ]
    }
    ```




