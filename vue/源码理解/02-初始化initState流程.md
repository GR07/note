
# initState() 入口

- 在 initMixin 内的 Vue.prototype._init() 函数内部

- initState() 里面就是依次对 props、methods、data、computed、watch 进行初始化处理



# initProps 处理

核心： 通过 defineReactive(props, key, value) 对 props 数据做响应式处理
      
```js
// 1. 通过 defineReactive(props, key, value) 对 props 数据做响应式处理
// 2. 将 key 代理到 vm 上，也就是拦截对 this.key 的访问
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // 缓存 props 的每个 key，性能优化
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  // 遍历 props 对象
  for (const key in propsOptions) {
    // 缓存 key
    keys.push(key)
    // 获取 props[key] 的默认值
    const value = validateProp(key, propsOptions, propsData, vm)
    // 为 props 的每个 key 是设置数据响应式
    defineReactive(props, key, value)
    // 代理到 vm 实例上
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

```



# initMethods 处理

核心：最简单没什么好说的，主要是挂载到 vue 实例上 ，通过 this.xx 访问

1. 校验 methoss[key]，必须是一个函数

2. 判重
 * methods 中的 key 不能和 props 中的 key 相同
 * methos 中的 key 与 Vue 实例上已有的方法重叠，一般是一些内置方法，比如以 $ 和 _ 开头的方法

 3. 将 methods[key] 放到 vm 实例上，得到 vm[key] = methods[key]

 ```js
function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn(
          `Method '${key}' has type '${typeof methods[key]}' in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      if (props && hasOwn(props, key)) {
        warn(
          `Method '${key}' has already been defined as a prop.`,
          vm
        )
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method '${key}' conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    // 相当于methods[key].bind(vm)
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
 ```



# initData 处理

核心：通过 observe 为 data 对象的上数据设置响应式

 ```js
/**
 * 做了三件事
 *   1、判重处理，data 对象上的属性不能和 props、methods 对象上的属性相同
 *   2、代理 data 对象上的属性到 vm 实例 （处理方式与props一样）
 *   3、为 data 对象的上数据设置响应式 
 */
function initData (vm: Component) {
  // 保证 data 是一个函数 返回一个对象，不是函数，则返回一个空对象，并警告提示
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  /**
   * 两件事
   *   1、判重处理，data 对象上的属性不能和 props、methods 对象上的属性相同
   *   2、代理 data 对象上的属性到 vm 实例
   */
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      // 判重处理
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method '${key}' has already been defined as a data property.`,
          vm
        )
      }
    }
    // 判重处理
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property '${key}' is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      // 代理 data 对象上的属性到 vm 实例
      proxy(vm, `_data`, key)
    }
  }
  // 为 data 对象上的数据设置响应式
  observe(data, true /* asRootData */)
}
// 如果是函数则 返回 函数中的对象
export function getData (data: Function, vm: Component): any {
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

 ```



# initComputed 处理

核心：为 computed[key] 创建 new Watcher() 实例，默认是懒执行

```js
const computedWatcherOptions = { lazy: true }

/**
 * 三件事：
 *   1、为 computed[key] 创建 watcher 实例，默认是懒执行
 *   2、代理 computed[key] 到 vm 实例
 *   3、判重，computed 中的 key 不能和 data、props 中的属性重复
 * @param {*} computed = {
 *   key1: function() { return xx },
 *   key2: {
 *     get: function() { return xx },
 *     set: function(val) {}
 *   }
 * }
 */
function initComputed (vm: Component, computed: Object) {
  // 实例上定义一个 _computedWatchers 对象，后面响应式会用（里面全都是 key 对应的 watcher实例）
  const watchers = vm._computedWatchers = Object.create(null)
  // 是否服务端渲染
  const isSSR = isServerRendering()

  // 遍历 computed 对象
  for (const key in computed) {
    
    const userDef = computed[key]
    // 获取 key 对应的值，即 getter 函数
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property '${key}'.`,
        vm
      )
    }

    if (!isSSR) {
      // 为每个 getter 函数 定义一个 实例化 watcher
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        // 配置项，computed 默认是懒执行
        computedWatcherOptions
      )
    }

    if (!(key in vm)) {
      // 代理 computed 对象中的属性到 vm 实例
      // 这样就可以使用 vm.computedKey 访问计算属性了
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      // 非生产环境有一个判重处理，computed 对象中的属性不能和 data、props 中的属性相同
      if (key in vm.$data) {
        warn(`The computed property '${key}' is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property '${key}' is already defined as a prop.`, vm)
      }
    }
  }
}

/**
 * 代理 computed 对象中的 key 到 vue实例上
 */
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  // 构造属性描述符(get、set)
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property '${key}' was assigned to but it has no setter.`,
        this
      )
    }
  }
  // 将 computed 代理到 vue实例 ，即可通过 this.xxx访问
  // 拦截对 target.key 的访问和设置
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

/**
 * computed 的实现核心 依赖于 watcher实例
 */
function createComputedGetter (key) {
  // computed 属性值会缓存的原理也是在这里结合 watcher.dirty、watcher.evalaute、watcher.update 实现的
  return function computedGetter () {
    // 得到当前 key 对应的 watcher
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      // watcher.dirty 属性就是大家常说的 computed 计算结果会缓存的原理
      // <template>
      //   <div>{{ computedProperty }}</div>
      //   <div>{{ computedProperty }}</div>
      // </template>
      // 像这种情况下，在页面的一次渲染中，两个 dom 中的 computedProperty 只有第一个
      // 会执行函数计算实际的值，
      // 即执行 watcher.evalaute，而第二个就不走计算过程了，
      // 因为上一次执行 watcher.evalute 时把 watcher.dirty 置为了 false，
      // 待页面更新后，wathcer.update 方法会将 watcher.dirty 重新置为 true，
      // 供下次页面更新时重新计算 computed.key 的结果
      if (watcher.dirty) {
        // 其实就是执行 实例化时，传入的 computed 的key函数
        // 得到 函数的执行结果 赋值给 watcher.value
        // dirty置为 false
        // computed 和 methods 区别 是 computed会缓存（原理就在 dirty 
        // 开关控制：
        // 页面渲染时候：会调用watcher.update() 这时会dirty置为 true
        // 第一次获取时候：会调用watcher.evaluate() 这时会dirty置为 false
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      // 然后把 computed 执行的值返回出来（具体看 watcher.evaluate() 里面的 get方法）
      // 如果 dirty 为 false 也就是有了缓存，则直接取 watcher.value
      return watcher.value
    }
  }
}

/**
 * 功能同 createComputedGetter 一样
 */
function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

```


# initWatch 处理

核心：与 computed 一样，最终都是依赖 new Watcher() 实现的

```js
/**
 * 做了两件事：
 *   1、遍历 watch 对象
 *   2、调用 createWatcher 函数
 */
function initWatch (vm: Component, watch: Object) {
  // 遍历 watch 对象
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      // handler 为数组，遍历数组，获取其中的每一项，然后调用 createWatcher
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

/**
 * 两件事：
 *   1、兼容性处理，保证 handler 肯定是一个函数
 *   2、调用 $watch 
 * @returns 
 */
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  // 如果 handler 为对象，则获取其中的 handler 选项的值
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  // // 如果是字符串，则说明是 methods 里面的方法，那么一定是去 methods 里面取
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

/**
 * 创建 watcher，返回 unwatch，共完成如下 5 件事：
 *   1、兼容性处理，保证最后 new Watcher 时的 cb 为函数
 *   2、标示用户 watcher
 *   3、创建 watcher 实例
 *   4、如果设置了 immediate，则立即执行一次 cb
 *   5、返回 unwatch
 * @param {*} expOrFn key
 * @param {*} cb 回调函数
 * @param {*} options 配置项，用户直接调用 this.$watch 时可能会传递一个 配置项
 * @returns 返回 unwatch 函数，用于取消 watch 监听
 */
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  // 为什么这里又做了一个对象的判断？
  // 兼容性处理，因为有可能是用户在组件里手动调用 this.$watch('asd', {})
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  // options.user 表示用户 watcher，还有渲染 watcher，即 updateComponent 方法中实例化的 watcher
  options = options || {}
  options.user = true
  // 创建 watcher
  const watcher = new Watcher(vm, expOrFn, cb, options)
  // 如果用户设置了 immediate 为 true，则立即执行一次回调函数
  if (options.immediate) {
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, `callback for immediate watcher '${watcher.expression}'`)
    }
  }
  // 返回一个 unwatch 函数，用于解除监听
  return function unwatchFn () {
    watcher.teardown()
  }
}
```


# 以上几个选项的总结

- Vue2 和 Vue3 分为两种 watcher

  1. 用户主动使用的 watcher（实例 watch 选项、computed 选项）

  2. 渲染 watcher（每个组件都有一个，用于通知组件重新渲染）

