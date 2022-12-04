# 什么是 Hook Event

Hook Event 是 Vue 的自定义事件，结合生命周期钩子实现的一种从组件外部为组件的生命周期注入额外的处理逻辑，此自定义事件会在 生命周期钩子执行后马上执行。


# 使用场景

假设现在有这么一个第三方的业务组件，在 mounted 生命周期中调用接口获取数据，然后将数据渲染到页面上。

但是接口等待时间可能比较长，我想在 mounted 生命周期开始执行的时候在控制台输出一个 loading ... 字符串，增强用户体验。

```vue
<template>
  <div class="wrapper">
    <ul>
      <li v-for="item in arr" :key="JSON.stringify(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    }
  },
  async mounted() {
    // 调用接口获取组件渲染的数据
    const { data: { data } } = await this.$axios.get('/api/getList')
    this.arr.push(...data)
  }
}
</script>

```

- 解决方法：

1. 比较麻烦，修改源码。

2. 就是 Hook Event，从组件外面为组件注入额外的生命周期方法。

```vue
<template>
  <div class="wrapper">
    <comp @hook:mounted="hookMounted" />
  </div>
</template>

<script>
// 这就是上面的那个第三方业务组件
import Comp from '@/components/Comp.vue'

export default {
  components: {
    Comp
  },
  methods: {
    hookMounted() {
      console.log('loading ...')
    }
  }
}
</script>
```


# 实现原理

从 vue 初始化过程源码可以看到，生命周期函数都是通过 callHook(vm, 'created') 函数调用执行的。

其实就是在执行生命周期钩子函数的时候，判断是否存在 ^hook:，存在就 $emit 触发这个自定义事件。

```js
/**
 * callHook(vm, 'mounted')
 * 执行实例指定的生命周期钩子函数
 * 如果实例设置有对应的 Hook Event，比如：<comp @hook:mounted="method" />，执行完生命周期函数之后，触发该事件的执行
 * @param {*} vm 组件实例
 * @param {*} hook 生命周期钩子函数
 */
export function callHook (vm: Component, hook: string) {

  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  // 从实例配置对象中获取指定钩子函数，比如 mounted
  const handlers = vm.$options[hook]
  // mounted hook
  const info = `${hook} hook`
  if (handlers) {
    // 通过 invokeWithErrorHandler 执行生命周期钩子（里面只不过用try catch 包裹了一下，便于错误捕获）
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }

  // vm._hasHookEvent 标识组件是否有 hook event，这是在 vm.$on 中处理组件自定义事件时设置的
  if (vm._hasHookEvent) {
    // 如果设置了 Hook Event，比如 <comp @hook:mounted="method" />，则 $emit 触发该事件
    vm.$emit('hook:' + hook)
  }
  // 关闭依赖收集
  popTarget()
}
```