/**
 * 真是业务场景中, 可能两个页面使用同一个组件, 默认情况下两个页面切换时不会触发created或者mounted钩子,
 * 
 * （组件实例会被复用，所以生命周期钩子不会再被调用）
 * 
 * 
 * 方法一: 官方说可以用 watch 监听 $route 变化来处理.
 * 
 * 方法二: 组件路由更新时(组件被复用时)调用 beforeRouteUpdate (to, from, next) {}
 * 
 * 方法三：还有一种方便的办法: 在 router-view 上加上一个唯一的key, 来保证路由切换时都会重新渲染触发钩子了.
 */




// 方法一. watch监听 $route 对象
watch: {
    '$route' (to, from) {
        // 对路由变化作出响应...
    }
}

// 方法二.beforeRouteUpdate 导航守卫
beforeRouteUpdate (to, from, next) {
    // doSomething
    // 最后一定要 next()
    next()
}

// 方法三.key

<router-view :key="key"></router-view>
 
 computed: {
   key() {
     return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
   }
 }
 