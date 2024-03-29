# helper 函数的作用

用于生成 VNode

将一个组件生成 VNode 的具体工作是由 render 函数中的 _c、_o、_l、_m 等方法完成的，这些方法都被挂载到 Vue 实例上面，负责在运行时生成组件 VNode

# 入口

```js
export function renderMixin (Vue: Class<Component>) {

  // 在组件实例上挂载一些运行时需要用到的工具方法
  installRenderHelpers(Vue.prototype)
  
  // ...
}

```

# 一些次要的 helper 函数

```js
/**
 * 在实例上挂载简写的渲染工具函数，这些都是运行时代码
 * 这些工具函数在编译器生成的渲染函数中被使用到了
 * @param {*} target Vue 实例
 */
export function installRenderHelpers(target: any) {
  /**
   * v-once 指令的运行时帮助程序，为 VNode 加上打上静态标记
   * 有点多余，因为含有 v-once 指令的节点都被当作静态节点处理了，所以也不会走这儿
   */
  target._o = markOnce
  // 将值转换为数字，通过 parseFloat 方式实现
  target._n = toNumber
  /**
   * 将值转换为字符串形式，普通值 => String(val)，对象 => JSON.stringify(val)
   */
  target._s = toString
  /**
   * 负责生成 v-for 所在节点的 vnode 的帮助函数。
   * 实现原理：遍历 val 值，为每一项执行 render 方法生成 VNode，最终返回一个 VNode 数组
   */
  target._l = renderList
  // 插槽 <slot>
  target._t = renderSlot
  /**
   * 判断两个值是否相等 ==
   */
  target._q = looseEqual
  /**
   * 相当于 indexOf 方法 查找数组下标
   */
  target._i = looseIndexOf
  /**
   * 运行时负责生成静态树的 VNode 的函数，完成了以下两件事
   *   1、执行 staticRenderFns 数组中指定下标的渲染函数，生成静态树的 VNode 并缓存，下次在渲染时从缓存中直接读取（isInFor 必须为 true）
   *   2、为静态树的 VNode 打静态标记
   */
  target._m = renderStatic
  // 解析 filter
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  /**
   * 为文本节点生成 VNode
   */
  target._v = createTextVNode
  /**
   * 为空节点生成 VNode
   */
  target._e = createEmptyVNode
}

```



# 核心 helper _c

_c 就是 组件内常写的 h() 函数

_c 不在上面定义，而在初始化的时候 initRender() 内部定义的。


```js
/**
 * 定义 _c，它是 createElement 的一个柯里化方法
 * @param {*} a 标签名
 * @param {*} b 属性的 JSON 字符串
 * @param {*} c 子节点数组
 * @param {*} d 节点的规范化类型
 * @returns VNode or Array<VNode>
 */
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
```
