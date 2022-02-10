# Vue 构建页面过程：

1. 先看new Vue()里面有没有el (挂载点)，如果没有就等后面的.$mount("#app")触发

2. 找到挂载点后，再判断有没有 render 函数选项，render 函数得到 createElement() 创建返回的 VNode 之后，把 VNode 返回给 new Vue() 的 .$mount("#app")

3. 没有 render 函数选项，再判断有没有 template 模板，

4. 有 template 模板，通过 Vue.compile() 把 template 模板 编译成 render 函数生成 VNode，如果没有，

5. 没有 template 模板，只好用 el 挂载的 外部 HTML 结构，去生成 template 模板 => Vue.compile() => render 函数 => .$mount("#app")。

- 优先级

render > template > el



# render 作用

render 函数 和 template 模板 都是用来返回 VNode 最终创建 html真实dom，（VNode是为了达到高效更新dom）

render函数是组件渲染的重要核心，它跟template模板开发一样，只不过是另一种形式开发，但 render 比 template 模板更接近编译器，这样能让Vue编译时少转换一次。

但是有些场景中用 template 实现起来代码冗长繁琐而且有大量重复，这时候就可以用 render 函数。

render 函数得到 createElement() 创建返回的 VNode 之后，返回给 new Vue() 的 mount 函数，

渲染成真实 DOM 节点，并挂载到根节点上。


# render 使用

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
// 示例一
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

```js
// 示例二
 render: function (createElement) {
   let _this = this['$options'].parent	// 我这个是在 .vue 文件的 components 中写的，这样写才能访问this
   let _header = _this.$slots.header   	// $slots: vue中所有分发插槽，不具名的都在default里
 
   /**
    * createElement 本身也是一个函数，它有三个参数
    * 返回值: VNode，即虚拟节点
    */
   return createElement(       
     // 1. 要渲染的标签名称：第一个参数【必需】      
     'div',   
     // 2. 1中渲染的标签的属性，详情查看文档：第二个参数【可选】
     {
       style: {
         color: '#333',
         border: '1px solid #ccc'
       }
     },
     // 3. 1中渲染的标签的子元素数组：第三个参数【可选】
     [
       'text',   // 文本节点直接写就可以
       _this.$slots.default,  // 所有不具名插槽，是个数组
       createElement('div', _header)   // createElement()创建的VNodes
     ]
   )
 }
```


# template 与 render 

- Vue 的 template 模板实际上通过 Vue.compile() 被编译成了渲染函数，这是一个实现细节。

- 作用 都是用来返回 VNode 最终创建 html 真实 dom

- 性能 render 比 template 模板更接近编译器，这样能让Vue编译时少转换一次。

- 优先级 new Vue({}) 选项中 render（高） template（低） 

- 都会挂载到 el，并替换整个 el: '#app' dom

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

- jsx 的出现是为了解决 render 函数（createElement函数）层级嵌套可读性较差

- jsx 相当于是 createElement 的语法糖，可以直接使用 template 模板那种格式在 render 函数里写。

- JSX 和 Render 函数，除了写法不一样外，没什么不同，属性都是遵循 Vue 文档。

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

# JSX兼容性 工程配置

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



# $el 和 el 区别

el 是 html页面里面的最初挂载点的 dom 结构

$el 是通过 vue 实例创建的 dom

最终 $el 会 替换掉 el 也就是完成了实例的挂载



# $mount 和 $el 的区别：

两者在使用效果上没有任何区别，都是为了将实例化后的vue挂载到指定的dom元素中。

注：当 new Vue({...}) 中没有 el 属性时，生命周期暂停，等待vm.$mount(el)调用时才继续

```js
// 两者作用相同

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
```







# innerHTML outerHTML 区别

innerHTML 不包括 Html 标签

outerHTML 包含 Html 标签本身
