# vue-router 是什么

是 vue 框架中前端路由的实现


# 前端路由 & 后端路由

最早都是后端路由，现在都是前端路由

## 后端路由

浏览器输入 url，发送到服务端去解析 url，找到对应的内容，再返回给浏览器。

缺点就是访问量大的网站，服务器压力较大。

## 前端路由

输入 url 后，浏览器本地去解析 url，找到对应的页面，执行 render 函数渲染，返回给浏览器。



# 工作原理

1. url 改变触发浏览器监听事件 onhashchange / onpopstate

2. 把当前路径存储到变量

3. vue 监听这个变量改变，通过路由表去匹配对应的 component

4. render 函数返回这个组件渲染到页面，最终完成了前端路由。



# hash & history

前端路由共 2 种模式

## hash

url #后面的就是 hash 的内容，通过 location.hash 获取，通过浏览器 onhashchange 监听变化

## history

域名后面的就是 history 的内容，通过 location.pathname 获取，通过浏览器 onpopstate 监听变化


# 具体实现

## 引入

```js
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
```

可以看到模块引入后，使用了 use 方法。

说明 Vue 把它当作一个插件注册，那么它内部一定会有一个 install() 方法.

后面又用了 new 命令，说明 import 引入进来的是一个构造函数。



## install 函数做了什么

1. install 执行时候会接收 vue 构造函数并挂到全局变量，所以在 vue-router 插件里可以使用 vue 内部方法

2. 执行 mixin 方法，追加一个 beforeCreate 钩子，这里是递归方式把 每个组件的实例上挂一个 _router 属性，值是 vue-router 实例。注意这个 mixin 每一个组件都会执行，所以每个组件都会挂上vuerouter实例。

3. 用 Object.defineProperty 再给 Vue 原型上定义两个属性 $router / $route，就可以访问到 vue-router 实例了。

4. 用 Vue.component() 注册两个全局组件 'RouterView' / 'RouterLink'

```js
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined
  // 给 vue 组件添加全局钩子和方法
  // 这里主要是为了把 vueRouter 放到每个组件的实例上。
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        // this 是根实例
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        
      } else {
        // 不是跟组件就把 当前父的实例挂过来，直到根实例。
        // 也就形成了递归
        // 这也是为什么只在根实例main.js里挂上即可 new Vue({ router })
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    }
  })
  
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })



  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

}

```


## 构造函数做了什么

1. 根据配置时的 mode 属性，注册对应的监听事件

2. 剩下都是一些原型上的方法 push / beforeEach 等等

```js
export default class VueRouter {

  constructor (options: RouterOptions = {}) {

    this.mode = options.mode

    this.routes = options.routes

    // 这个很重要，组件实例增加一个属性，current 变为响应式属性，
    _Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')

    // 执行监听路由
    this.init()
  }

  init (app: any /* Vue component instance */) {

    if (this.mode === 'hash') {
      window.addEventListener('load', () => {
        this.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.current = location.hash.slice(1)
      })
    }
    
  }

  beforeEach (fn: Function): Function {
    return registerHook(this.beforeHooks, fn)
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  }

}
```

# RouterView 组件做了什么

通过路由表和上面存的 current ，匹配到对应的 component，render 函数返回，就完成了基础实现。
```js
render (h) {
  let current = this.$router.current
  let routes = this.$router.routes
  let router = routes.find(item => item.path === current)
  return h(router.component)
}
```


# vue-router 模块管理

```js
import bankCard from '@/pages/beforehand/list/bank-card.vue'

const routerList = []

function importAll (r) {
  r.keys().forEach(item => routerList.push(r(item).default))
}
importAll(require.context('./', true, /\.router\.js/))

const routes = [
  ...routerList,
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '预入职信息采集'
    }
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: welcome,
    meta: {
      title: '欢迎加入'
    }
  }
]

const router = new Router({
  routes: routes
})
```