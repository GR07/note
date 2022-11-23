# 入口 initGlobalAPI

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
   * 暴露一些工具方法，轻易不要使用这些工具方法，处理你很清楚这些工具方法，以及知道使用的风险
   */
  Vue.util = {
    // 警告日志
    warn,
    // 类似选项合并
    extend,
    // 合并选项
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