# 真实 dom 的生成过程

1. 将 template 模板编译为 render 函数

2. render 函数执行后 return 虚拟 dom （vue 是基于了 snabbdom 库去实现虚拟 dom）

3. 利用patch函数把虚拟dom渲染到页面 patch(dom, vnode)

```js
const patch = snabbdom.init([
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners
])
// render 函数
const h = snabbdom.h

const box = document.getElementById('box')
// 利用 render 函数 返回 vnode
const vnode = h('p', '我是dom内容')
// 利用patch函数，把 vnode 渲染到指定 dom 节点
patch(box, vnode)

```

# dom 更新过程

1. 在组件首次渲染时，会对数据的依赖收集

2. 数据改变时，触发 setter

3. setter 通知 Watcher 重新渲染

4. 渲染之前又会将 template 模板编译为 AST => AST优化 => 生成一个新的 render 函数 => 返回 vnode => 利用 patch 渲染到指定 dom

5. 注意更新时，会对比新老 patch(vnode, newVnode)