# 初始化的起点

initMixin 内的 Vue.prototype._init 函数



# initInternalComponent(vm, options)

* 根组件走到这里：进行选项合并，将全局配置选项合并到根组件的局部配置上

* 每个子组件走到这里，这里只做了一些性能优化
* 将组件配置对象上的一些深层次属性放到当前组件的 vm.$options 选项中，减少原型链查找以提高代码的执行效率



# initLifecycle(vm)

初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等


# initEvents(vm)

初始化 组件的自定义事件

* 所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者其实不是父组件
* 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
* 编译后其实是这样
* this.$emit('click') this.$on('click', function handleClick() {})


# initRender(vm)

解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数


# callHook(vm, 'beforeCreate')

执行 beforeCreate 生命周期函数 


# initInjections(vm)

初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 vm 实例

实现原理：其实是子组件去祖代组件里一层层的找 provied 注入的 key，找到后赋值给子组件的 inject，最终得到key=val的对象，并做响应式处理

# initState(vm)

数据响应式的重点，初始化 props、methods、data、computed、watch

注：以上 5 个选项具体过程：2.0源码理解/初始化initState流程.md
    

# initProvide(vm)

解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上


# callHook(vm, 'created')

由以上顺序也可得知，beforeCreate 钩子函数是拿不到数据属性的，因为 initState 在后面。


# vm.$mount(vm.$options.el)

如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount


# 最后进入挂载阶段


```js
export function initMixin (Vue: Class<Component>) {
  // 负责 Vue 的初始化过程
  Vue.prototype._init = function (options?: Object) {
    // vue 实例
    const vm: Component = this
    // 每个 vue 实例都有一个 _uid，并且是依次递增的
    vm._uid = uid++

    // a flag to avoid this being observed
    vm._isVue = true

    // if else 处理组件配置项
    // merge options
    if (options && options._isComponent) {
      /**
       * 每个子组件初始化时走这里，这里只做了一些性能优化
       * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
       */
      initInternalComponent(vm, options)
    } else {
      // 根组件走这里：进行选项合并，将全局配置选项合并到根组件的局部配置上
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm


    // 整个初始化最重要的部分，核心


    // 初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等
    initLifecycle(vm)

    /**
     * 初始化 组件的自定义事件
     * 
     * 所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者其实不是父组件
     * 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
     * 编译后其实是这样
     * this.$emit('click') this.$on('click', function handleClick() {})
     */
    initEvents(vm)


    // 解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数
    initRender(vm)

    // 执行 beforeCreate 生命周期函数 
    callHook(vm, 'beforeCreate')

    // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 vm 实例
    initInjections(vm) // resolve injections before data/props
    
    // 数据响应式的重点，处理 props、methods、data、computed、watch
    initState(vm)

    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
    initProvide(vm) // resolve provide after data/props

    // 调用 created 钩子函数
    callHook(vm, 'created')


    // 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

```