共同点:

1.都是数据驱动


2.父子传值

vue 属性传值 props接收

react 属性传值 props接收


3.子父传值

vue 在子组件里触发父组件里的事件, 在父里修改

react 从父组件里把事件传给子组件, 在子组件修改


4.都是单向数据流 子不可以直接修改父传过来的值


5.生命周期都是四个阶段

初始化阶段 / 挂载阶段 / 更新阶段 / 销毁阶段 





不同点:

1.页面数据存放

vue 在data{}里

react 在 构造函数里的state{}


2.改变数据

vue 直接this.a 赋值

react 需要在构造函数里constructor先绑定.bind(this) 再通过 setState({ a = b })


3.循环

vue v-for指令

react map方法循环return()


4.等dom更新完成后 再做一些事

vue nextTick()

react setState({}, () => {})


5.管理数据

vue vuex

react redux

6.管理路由

vue vue-router

react react-router


7.ui框架

vue ele

react antd

