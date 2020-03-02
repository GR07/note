/**
 * 方法一: props / $emit
 * 
 * 父组件A通过props的方式向子组件B传递，B to A 通过在 B 组件中 $emit, A 组件中 v-on 的方式实现。
 */

// 当需要在子组件里修改父组件值的时候使用 .sync 是 v-model 的语法糖. 


/**
 * 方法二: vuex (如果仅仅是传递数据，而不做中间处理，使用 vuex ，未免有点大材小用。)
 * 
 * 
 * state: 存放数据, 全局唯一.
 * 
 * mutation: 修改数据, 要修改state时, 必须通过mutation修改.
 * 
 * commit：对mutation进行提交，是唯一能执行mutation的方法。
 * 
 * actions: 异步操作必须在actions里面执行. (如果修改数据也要通过mutation), 由commit()来触发mutation的调用.
 * 
 * Vue组件: 组件中执行dispatch方法触发对应action.
 * 
 * dispatch：是唯一能触发执行action的方法。例如(组件中的 $store.dispatch)
 * 
 * getters：state对象读取方法。
 * 
 */
// 注意: vuex存储的数据是响应式的。但是并不会保存起来，刷新之后就回到了初始状态,
// 所以具体做法-----应该在vuex数据改变时候把数据拷贝一份保存到localStorage,
// 刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state.

// 示例
let defaultCity = "上海";
try { // 用户关闭了本地存储功能，此时在外层加个try...catch
  if (!defaultCity) {
    // localStorage 只支持字符串，所以需要用JSON转换：
    defaultCity = JSON.parse(window.localStorage.getItem('defaultCity'));
  }
} catch(e) {console.log('defaultCity异常')}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity (state, newCity) {
      state.city = newCity;
      try {
        // 数据改变的时候把数据拷贝一份保存到localStorage里面
        window.localStorage.setItem('defaultCity', JSON.stringify(state.city));
      } catch(e) {}
    }
  }
})




/**
 * 方法三: $attrs / $listeners (Vue2.4新增)
 * 
 * $attrs：存放的是父组件中绑定的非 Props 属性, 可以通过 v-bind="$attrs" 传入内部组件.
 * 
 * $listeners: 存放的是父组件中绑定的非原生事件, 可以通过 v-on="$listeners" 传入内部组件.
 * 
 * 原理: 通过中间组件当作桥梁进行祖孙传递.
 * 
 */





/**
 * 方法四: provide / inject (Vue2.2.0新增)
 * 
 * 祖父组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 拿到变量.
 * 
 * 主要解决了跨级组件间的通信问题.
 * 
 * 使用场景: 主要是子组件获取上级组件的状态.
 * 
 * 注意: provide 和 inject 绑定并不是可响应的,
 * 所以下面的 A.vue 的 name 如果改变了, B.vue 的 this.name 是不会改变的, 仍然是 guor.
 */
// 示例
// A.vue 祖父组件
export default {
  provide: {
    name: 'guor'
  }
}
// B.vue 后代组件
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name) // guor
  }
}


// 数据响应解决方案:

// 1.把祖父组件中的vue实例给provide, 然后子孙组件中直接引用祖先实例的属性.(不推荐)

// 2.用vue2.6最新API Vue.observable 优化响应式 provide (推荐)

// 方法二:使用vue2.6最新API Vue.observable 优化响应式 provide
  
provide() {
  this.theme = Vue.observable({
    color: "blue"
  });
  return {
    theme: this.theme
  }; 
},




/**
 * 方法五: $parent / $children & ref
 * 
 * ref: 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素, 如果用在子组件上, 引用就指向组件实例.
 * 
 * $parent / $children: 访问父 / 子实例
 * 
 * 
 * 两种都是直接得到组件实例, 使用后可以直接调用组件的方法或访问数据.
 * 
 * 弊端: 两种方法的弊端是, 无法在跨级或兄弟间通信.
 */




/**
 * 方法六: $emit　/ $on
 * 
 * 这种方法通过一个空的Vue实例作为中央事件总线（事件中心），
 * 用它来触发事件和监听事件,
 * 巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。
 * (项目比较大时，可以选择更好的状态管理解决方案vuex。)
 */








 