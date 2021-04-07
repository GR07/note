# render

render 函数 跟 template 一样都是创建 html 模板的。

但是有些场景中用 template 实现起来代码冗长繁琐而且有大量重复，这时候就可以用 render 函数。

它是个函数，它的参数也是个函数——即 createElement

render 函数得到 createElement() 创建返回的 VNode 之后，返回给 new Vue() 的 mount 函数，

渲染成真实 DOM 节点，并挂载到根节点上。

就是这么简单 别想多了。


# 返回值

render 函数的返回值 虚拟节点（VNode）


# 参数

createElement 是 render 函数 的参数，它本身也是个函数，返回值是虚拟节点（VNode），并且有三个参数。

1. 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。类型：{String | Object | Function}。必需。

2. 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。类型：{Object}。可选。

3. 子虚拟节点 (VNodes)，由 createElement() 构建而成，也可以使用字符串来生成“文本虚拟节点”。类型：{String | Array}。可选。

```js
/**
  * render: 渲染函数
  * 参数: createElement
  * 参数类型: Function
 */
 render: function (createElement) {
   let _this = this['$options'].parent	// 我这个是在 .vue 文件的 components 中写的，这样写才能访问this
   let _header = _this.$slots.header   	// $slots: vue中所有分发插槽，不具名的都在default里
 
   /**
    * createElement 本身也是一个函数，它有三个参数
    * 返回值: VNode，即虚拟节点
    * 1. 一个 HTML 标签字符串，组件选项对象，或者解析上述任何一种的一个 async 异步函数。必需参数。{String | Object | Function} - 就是你要渲染的最外层标签
    * 2. 一个包含模板相关属性的数据对象你可以在 template 中使用这些特性。可选参数。{Object} - 1中的标签的属性
    * 3. 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选参数。{String | Array} - 1的子节点，可以用 createElement() 创建，文本节点直接写就可以
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

```js
// render函数
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'div',   // 标签名称
      '我是dom元素'
    )
  },
  props: {}
})

// 上面render函数等同于下面

Vue.component('anchored-heading', {
  template: '<div>我是dom元素</div>',
  props: {}
})
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



# render 和 template

如果 new Vue() 实例中存在 render 函数或 template 属性，则挂载元素 #app 会被 替换

render 例子
```js
// 替换前
<div id="app"></div> 

const App = { template: '<div id ="asdasd">appsadsa</div>' };
new Vue({
  el: '#app',
  router,
  store, 
  render: h => h(App)
})

// 替换后
<div id ="asdasd">appsadsa</div>
```

template 例子
```js
// 替换前
<div id="app"></div> 

const App = { template: '<div id ="asdasd">appsadsa</div>' };
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 替换后
<div id ="asdasd">appsadsa</div>
```

上面两个例子 el: '#app' 可以替换为.$mount("#app");

```js
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```




# Vue 构建页面过程：

1. 先看new Vue()里面有没有el (挂载点)，如果没有就等后面的.$mount("#app")触发

2. 找到挂载点后，再判断有没有 template 模板。

3. 如果有 template 模板，用 render 函数生成虚拟dom，如果没有，用 el 挂载的 HTML 结构，生成模板再执行 render 函数。

注意：如果指定了 render 函数，则直接采用 render 函数，不用判断 template 参数和 el 外部 HTML


## 优先级

render => template => el



# innerHTML outerHTML 区别

innerHTML 不包括 Html 标签

outerHTML 包含 Html 标签本身
