# 作用

vue 中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染 DOM

keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们


# 注意

include 缓存的参数不是 路由的name，是组件的 name

```javascript
export default {
 name:'a', // include 或 exclude所使用的name
 data () {},
}
```


# 钩子执行顺序

首次进入：beforeRouteEnter() => created() => mounted => activated() => beforeRouteLeave() => deactivated()

再次进入：beforeRouteEnter() => activated() => beforeRouteLeave() => deactivated()

