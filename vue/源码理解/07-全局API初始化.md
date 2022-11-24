# 前言

为什么根实例挂载的 API，后面所有的组件都访问到？

因为，所有的组件都是基于根 Vue 实例去扩展的（initExtend）一个子类，所以自然会有基类的方法和属性。

# 全局 API 初始化入口 initGlobalAPI

core/global-api/index.js 

```js
/**
 * 初始化 Vue 的众多全局 API，比如：
 *   默认配置：Vue.config
 *   工具方法：Vue.util.xx
 *   Vue.set、Vue.delete、Vue.nextTick、Vue.observable
 *   Vue.options.components、Vue.options.directives、Vue.options.filters、Vue.options._base
 *   Vue.use、Vue.extend、Vue.mixin、Vue.component、Vue.directive、Vue.filter
 *   
 */
// 全局默认的配置对象
import config from '../config'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config 是全局默认的配置
  const configDef = {}
  // Vue 的众多默认配置项
  configDef.get = () => config

  // 将配置代理到 Vue 构造函数上， 通过 Vue.config.xx 访问
  Object.defineProperty(Vue, 'config', configDef)

  /**
   * 暴露一些工具方法，轻易不要使用这些工具方法，除非你很清楚这些工具方法，以及知道使用的风险
   */
  Vue.util = {
    // 警告日志
    warn,
    // 类似选项合并
    extend,
    // 合并选项，对比 extend， 增加了处理 mixins 和 extends
    mergeOptions,
    // 设置响应式
    defineReactive
  }

  // 设置为响应式数据，内部实现：对象还是 defineReactive()，数组是重写的 splice
  // 但是不能是根数据
  Vue.set = set

  // 删除属性，但是可以触发更新视图
  Vue.delete = del

  // 不用多说了
  Vue.nextTick = nextTick

  // 为对象设置响应式，内部实现还是 observe()
  Vue.observable = (obj) => {
    observe(obj)
    return obj
  }

  // 定义三个空对象，通过选项合并变为全局使用
  // Vue.options.compoents / directives / filter
  // vue 全局配置上的
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // 将 Vue 构造函数挂载到 Vue.options._base 上
  Vue.options._base = Vue

  // 在 Vue.options.components 中添加内置组件，比如 keep-alive

  // 然后在每个组件上都可以使用了
  extend(Vue.options.components, builtInComponents)

  // Vue.use
  initUse(Vue)
  // Vue.mixin
  initMixin(Vue)
  // Vue.extend
  initExtend(Vue)
  // Vue.component/directive/filter
  initAssetRegisters(Vue)
}

```

# Vue.use

用于注册插件，可接受函数或对象

```js
/**
 * 定义 Vue.use，负责为 Vue 安装插件，做了以下两件事：
 *   1、判断插件是否已经被安装，如果安装则直接结束
 *   2、安装传入的插件，执行传入插件的 install 方法
 * @param {*} plugin install 方法 或者 包含 install 方法的对象
 * @returns Vue 实例
 */
Vue.use = function (plugin: Function | Object) {
  
  // 已经安装过的插件列表
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  
  // 判断 plugin 是否已经安装，保证不重复安装

  // 注意 indexOf 可以判断 两个相同地址的对象相等
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }

  // 类数组转数组，将 Vue 构造函数放到第一个参数位置，然后将这些参数传递给 install 方法

  // 因为 install(Vue) 第一个参数就是 Vue实例
  const args = toArray(arguments, 1)
  args.unshift(this)

  if (typeof plugin.install === 'function') {
    // plugin 是一个对象，则执行其 install 方法安装插件
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    // 执行直接 plugin 方法安装插件
    plugin.apply(null, args)
  }
  // 在 插件列表中 添加新安装的插件
  installedPlugins.push(plugin)
  return this
}

```


# initMixin

定义 Vue.mixin，负责全局混入选项，影响之后所有创建的 Vue 实例，这些实例会合并全局混入的选项

```js
/**
 * @param {*} mixin Vue 配置对象
 * @returns 返回 Vue 实例
 */
Vue.mixin = function (mixin: Object) {
  // 在 Vue 的默认配置项上合并 mixin 对象
  this.options = mergeOptions(this.options, mixin)
  return this
}


/**
 * 合并两个选项，出现相同配置项时，子选项会覆盖父选项的配置
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  // 标准化 props、inject、directive 选项，方便后续程序的处理
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // 处理原始 child 对象上的 extends 和 mixins，分别执行 mergeOptions，将这些继承而来的选项合并到 parent
  // mergeOptions 处理过的对象会含有 _base 属性
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  // 遍历 父选项
  for (key in parent) {
    mergeField(key)
  }

  // 遍历 子选项，如果父选项不存在该配置，则合并，否则跳过，因为父子拥有同一个属性的情况在上面处理父选项时已经处理过了，用的子选项的值
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  // 合并选项，childVal 优先级高于 parentVal
  function mergeField (key) {
    // strat 是合并策略函数，如何 key 冲突，则 childVal 会 覆盖 parentVal
    const strat = strats[key] || defaultStrat
    // 值为如果 childVal 存在则优先使用 childVal，否则使用 parentVal
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

```


# initExtend

基于 Vue 去扩展一个子类，该子类同样支持进一步的扩展。

```js
/**
 * Each instance constructor, including Vue, has a unique
 * cid. This enables us to create wrapped "child
 * constructors" for prototypal inheritance and cache them.
 */
Vue.cid = 0
let cid = 1

/**
 * 基于 Vue 去扩展子类，该子类同样支持进一步的扩展
 * 扩展时可以传递一些默认配置，就像 Vue 也会有一些默认配置
 * 默认配置如果和基类有冲突则会进行选项合并（mergeOptions)
 */
Vue.extend = function (extendOptions: Object): Function {
  extendOptions = extendOptions || {}
  const Super = this
  const SuperId = Super.cid

  /**
   * 利用缓存，如果存在则直接返回缓存中的构造函数
   * 什么情况下可以利用到这个缓存？
   *   如果你在多次调用 Vue.extend 时使用了同一个配置项（extendOptions），这时就会启用该缓存
   */
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId]
  }

  const name = extendOptions.name || Super.options.name
  if (process.env.NODE_ENV !== 'production' && name) {
    validateComponentName(name)
  }

  // 定义 Sub 构造函数，和 Vue 构造函数一样
  const Sub = function VueComponent(options) {
    // 初始化
    this._init(options)
  }
  // 通过原型继承的方式继承 Vue
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
  Sub.cid = cid++
  // 选项合并，合并 Vue 的配置项到 自己的配置项上来
  Sub.options = mergeOptions(
    Super.options,
    extendOptions
  )
  // 记录自己的基类
  Sub['super'] = Super

  // 初始化 props，将 props 配置代理到 Sub.prototype._props 对象上
  // 在组件内通过 this._props 方式可以访问
  if (Sub.options.props) {
    initProps(Sub)
  }

  // 初始化 computed，将 computed 配置代理到 Sub.prototype 对象上
  // 在组件内可以通过 this.computedKey 的方式访问
  if (Sub.options.computed) {
    initComputed(Sub)
  }

  // 定义 extend、mixin、use 这三个静态方法，允许在 Sub 基础上再进一步构造子类
  Sub.extend = Super.extend
  Sub.mixin = Super.mixin
  Sub.use = Super.use

  // 定义 component、filter、directive 三个静态方法
  ASSET_TYPES.forEach(function (type) {
    Sub[type] = Super[type]
  })

  // 递归组件的原理，如果组件设置了 name 属性，则将自己注册到自己的 components 选项中
  if (name) {
    Sub.options.components[name] = Sub
  }

  // 在扩展时保留对基类选项的引用。
  // 稍后在实例化时，我们可以检查 Super 的选项是否具有更新
  Sub.superOptions = Super.options
  Sub.extendOptions = extendOptions
  Sub.sealedOptions = extend({}, Sub.options)

  // 缓存
  cachedCtors[SuperId] = Sub
  return Sub
}

function initProps (Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed (Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}

```




# Vue.component、Vue.filter、Vue.directive

/src/core/global-api/assets.js

这三个 API 实现比较特殊，但是原理又很相似，所以就放在了一起实现。

```js
const ASSET_TYPES = ['component', 'directive', 'filter']

/**
 * 定义 Vue.component、Vue.filter、Vue.directive 这三个方法
 * 这三个方法所做的事情是类似的，就是在 this.options.xx 上存放对应的配置
 * 比如 Vue.component(compName, {xx}) 结果是 this.options.components.compName = 组件构造函数
 * ASSET_TYPES = ['component', 'directive', 'filter']
 */
ASSET_TYPES.forEach(type => {
  /**
   * 比如：Vue.component(name, definition)
   * @param {*} id name
   * @param {*} definition 组件构造函数或者配置对象 
   * @returns 返回组件构造函数
   */
  Vue[type] = function (
    id: string,
    definition: Function | Object
  ): Function | Object | void {
    if (!definition) {
      return this.options[type + 's'][id]
    } else {
      if (type === 'component' && isPlainObject(definition)) {
        // 如果组件配置中存在 name，则使用，否则直接使用 id
        definition.name = definition.name || id
        // extend 就是 Vue.extend，所以这时的 definition 就变成了 组件构造函数，使用时可直接 new Definition()
        definition = this.options._base.extend(definition)
      }
      if (type === 'directive' && typeof definition === 'function') {
        definition = { bind: definition, update: definition }
      }
      // this.options.components[id] = definition
      // 在实例化时通过 mergeOptions 将全局注册的组件合并到每个组件的配置对象的 components 中
      this.options[type + 's'][id] = definition
      return definition
    }
  }
})

```