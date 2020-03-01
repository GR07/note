/**
 * 真是业务场景中, 可能两个页面使用同一个组件, 默认情况下两个页面切换时不会触发created或者mounted钩子,
 * 官方说可以用 watch 监听 $route 变化来处理,
 * 
 * 还有一种方便的办法: 在 router-view 上加上一个唯一的key, 来保证路由切换时都会重新渲染触发钩子了.
 */

<router-view :key="key"></router-view>

computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 }