
    当点击切换路由时：
    beforeRouteLeave
    beforeEach // 全局进入前
    beforeEnter // 路由独享的 跟beforeEach一样
    beforeRouteEnter // 组件内的 在beforeCreate之前 所以this不是实例
    beforeResolve // 跟beforeEach一样 区别它是在beforeRouteEnter之后
    afterEach // 全局进入后 在beforeCreate之前 没有next参数

    beforeCreate
    ...
    ...
    mounted
    
    mounted 之后 执行 beforeRouteEnter 里面的 next()

    


    // API:

    // 获取
    this.$route.params // 获取路由参数 ---------- 类型: Object
    this.$route.query // 获取查询参数 -----------类型: Object
    this.$route.path // 获取当前路由的绝对路径 ----类型: string
    this.$route.fullPath // 获取包括 当前绝对路径 + 查询参数 + hash 的完整路径 ----------类型: string
    this.$route.hash // 获取hash值 （带 # 往后的部分，history取不到）-------类型: string
    this.$route.name // 路由设置的name
    this.$route // 访问当前路由的信息
    // 类似操作 history 对象
    this.$router.go(-1)
    this.$router.push('/') // 向 history 添加一条历史记录
    this.$router.replace() // 不会有记录
    // 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active。

    
    // 语法：实际上它们是效仿 window.history API 
    
    this.$router.push('home') // 参数类型字符串
    
    this.$router.push({ path: 'home' }) // 参数类型对象

    this.$router.push({ name: 'user', params: { userId: '123' }}) // 命名的路由

    this.$router.push({ path: 'register', query: { plan: 'private' }}) // 带查询参数，变成 /register?plan=private

    this.router.go(1) // 在浏览器记录中前进一步，等同于 history.forward()

    this.router.go(-1) // 后退一步记录，等同于 history.back()

    this.router.go(3) // 前进 3 步记录

    this.router.go(-100) / this.router.go(100) // 如果 history 记录不够用，那就默默地失败呗
    


    // 路由的基础使用：4个步骤

    // 1. 定义组件。
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }

    // 2. 定义路由
    const routes = [
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
    ]

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数。
    const router = new VueRouter({
      routes // (缩写) 相当于 routes: routes
    })

    // 4. 创建和挂载根实例。
    // 要通过 router 配置参数注入路由，从而让整个应用都有路由功能
    const app = new Vue({
      router
    }).$mount('#app')

    // 5. 嵌套子路由
    routes: [
      { 
        path: '/user/:id', 
        component: User,
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',
            component: UserProfile
          }
        ]
      }
    ]
    
    // 6.展示多个视图:

    // <router-view class="view one"></router-view>
    // <router-view class="view two" name="a"></router-view>
    // <router-view class="view three" name="b"></router-view>

    const router = new VueRouter({
      routes: [
        {
          path: '/',
          components: {
            default: Foo, // 如果router-view没有设置 name 默认 default
            a: Bar,
            b: Baz
          }
        }
      ]
    })
    
    // 7.嵌套命名视图
    const Home = { template: `<div>home<router-view></router-view><router-view name="helper"></router-view></div>` };
    const Aa = { template: '<div>a</div>' };
    const Bb = { template: '<div>b</div>' };
    const Cc = { template: '<div>c</div>' };
    const Dd = { template: '<div>d</div>' };

    const routes = [
      { 
        path: '/home', 
        component: Home,
        children: [
          {
            path: 'a',
            component: Aa
          }, 
          {
            path: 'b',
            components: {
              default: Cc,
              helper: Dd
            }
          }
        ]
      }
    ]




    // 路由传参


    // 动态路由 params 传参 ( 针对 ID 各不相同的用户传值 )
    // 这样 params 会在 url 里，页面刷新数据也可以持久化存储。
    const routes = [
      { path: '/foo/:id', component: Foo },
      { path: '/bar/:id', component: Bar }
    ]
    this.$route.params.id; // 获取的就是 路由中 :id 部分

    /user/:username/post/:post_id // 规则模式
    /user/evan/post/123 // 可以匹配的路径
    this.$route.params  // { username: 'evan', post_id: '123' }

    // 匹配任意路径 通配符 *
    {
      // 会匹配以 `/user-` 开头的任意路径
      path: '/user-*'
    }
    // 使用通配符时，$route.params 内会自动添加一个名为 pathMatch 参数

    // 路由设置中 { path: '/user-*' }
    this.$router.push('/user-admin')
    this.$route.params.pathMatch // 'admin'



    // 路由props传参：
    // 概念：用 props 接收替代 params 接收 达到解耦的目的
    {
      path: "/test2/:id/:age",
      component:test2,
      // props:{id:"fang",age:18}
      props:true
    }
    export default {
      props: ["id", "age"]
    }
    

    // 编程式的导航:

    // 声明式 <router-link :to="...">
    // 编程式 router.push(location, onComplete?, onAbort?) 后2参数导航成功回调、终止时回调
    // 例子：以下两种本质和作用完全一样，都会导航到 /user/123 
    routes: [
      {
        path: '/user/:userId',
        name: 'user',
        component: User
      }
    ]
    // <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
    // router.push({ name: 'user', params: { userId: 123 }})




    // 路由重定向:

    // 概念：当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b
    routes: [
      { path: '/a', redirect: '/b' } // 例子：当跳转到a，变成b的路由规则url也变为a
    ]
    // 注意：为 /a 路由添加一个 beforeEach 或 beforeLeave 守卫并不会有任何效果。

    // 别名:
    // 概念：访问 /b 时显示的ui视图是 /a 但是url还是 /b
    routes: [
      { path: '/a', component: A, alias: '/b' } // 例子：当跳转到b，变成a的ui视图 url 还是b
    ]




    // 导航守卫

    // 记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。



    // beforeEach: 全局前置守卫
    // 这个钩子作用主要是用于登录验证，也就是路由还没跳转提前告知，以免跳转了再通知就为时已晚。

    // to: 即将进入的路由
    // from: 即将离开的路由
    // next(): 做完该做的事情后 进入到目标路由（to）
    // next(false)：中断跳转回到 from
    // next({ path: '/login', }) 表示重定向, 注意：会再次调用beforeEach()
    // to.matched是一个对象数组，里面有to路由的相关信息
    // 例子 进入任意路由前 判断路由配置里有没有 meta: title 字段 有的话 给页面设置 title
    router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
      if (to.meta.title) {//判断是否有标题
        document.title = to.meta.title
      }
      next()//执行进入路由，如果不写next就不会进入目标页
    })
    // next() 表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
    // next({ path: '/login', }); 表示路由拦截成功，重定向至login，会再次调用router.beforeEach()
    // 也就是说beforeEach()必须调用next()，否则就会出现无限循环
    // next() 和 next('xxx') 是不一样的，区别就是前者不会再次调用router.beforeEach()，后者会。


    // beforeResolve: 和beforeEach类似，也是路由跳转前触发。

    // 区别：会在所有组件内的守卫和异步路由组件被解析之后才被调用。即在 beforeEach 和 组件内beforeRouteEnter 之后，afterEach之前调用。


    // afterEach: 和beforeEach相反，他是在路由跳转完成后触发

    // afterEach钩子不接受 next 函数也不会改变导航本身
    router.afterEach((to, from) => {
      // ...
    })



    // beforeEnter: 路由配置里调用 

    // beforeEnter 和 beforeEach完全相同，如果都设置则在beforeEach之后紧随执行。

    // 在路由配置上定义 beforeEnter
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }



    // 组件内的守卫:
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // 但是可以传回调参数是vue实例
      next(vm => {
        // 但可以通过 `vm` 访问组件实例
      })
      // 也可以在这里进行数据请求
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      this.name = to.params.name
      next()
    }
    /**
     * 导航离开该组件的对应路由时调用
     * 
     * 注意这里禁止路由跳转
     * 
     * 可以访问组件实例 `this`
     */
    beforeRouteLeave (to, from, next) {
      console.log(' beforeRouteLeave !', this)
      const answer = window.confirm('确认离开？')
      answer ? next() : next(false)
    }
    // 为什么禁止路由跳转，如果执行进入 if 代码块 会陷入死循环
    beforeRouteLeave(to, from, next) {
      if (do something...) {
          // 因为在调用 $router 时，又触发了 beforeRouteLeave 从而又执行了 $router 跳转，
          // 所以出现了死循环，在 beforeRouteEnter 里面跳转是没有问题的
          this.$router.replace("/");
          next()
      } else {
          next()
      }
    }


    // 滚动行为: scrollBehavior
    // 兼容性: 只支持 history.pushState 的浏览器
    const router = new VueRouter({
      routes: [...],
      scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 } // 所有页面都滚到顶部
      }
    })
    // 第三个参数 savedPosition 仅当通过浏览器的 前进/后退 按钮触发 时才可用。
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样



    
    // 路由懒加载：

    // 先把组件的加载变成异步任务（promise）。
    const Foo = () => Promise.resolve({ template: '<div>I am async!</div>' })
    // 然后用webpack的import定义代码分块点。
    import('./Foo.vue') // 返回 Promise
    // 结合起来就是定义一个能够被 Webpack 自动代码分割的异步组件：
    const Foo = () => import('./Foo.vue')
    
    // 在路由配置中什么都不需要改变，只需要像往常一样使用 Foo
    routes: [
      { path: '/foo', component: Foo }
    ]
    // 再简化：
    { path: '/foo', component: () => import('./Foo.vue') }

