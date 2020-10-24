#### 注意坑：

1.自定义组件必须使用大写开头 <App />

2.jsx语法最外层必须包裹一层，如果不想套一层dom，可以使用<Fragment></Fragment>包裹

3.绑定样式使用 <li className="guor"></li>

4.数据都是写在constructor state里面

5.需要给自定义方法绑定this，可以在render中或constructor中使用bind(this)，注：constructor中性能最好

6.改变state中的数据必须使用this.setState({inputValue: this.input.value}) 注：setState是异步的操作，因为虚拟dom的渲染也是有时间的

7.更改state 中的 list，必须要用变量赋值的形式，虽然不报错但是会有很大的性能问题（官网标注），下面是正确用法。
let list = this.state.list;
list.splice(index, 1);
this.setState({
    list: list
})

8.绑定事件要大写onClick

9.循环渲染dom的时候也要绑定key

10.jsx如果需要换行需要加个括号 () 否则不可以换行

11.jsx中写注释用大括号包着 {/*注释*/}

12.如果想解析html标签 dangerouslySetInnerHTML={{__html: item}}

13.<label htmlFor="guor">标签的for改为htmlFor 防止与js冲突

14.父传子是属性传值

15.子传父，注意不可以直接修改父，因为是单向数据流。
必须通过父组件的方法去改变父组件的值，
也就是把父组件的方法传过去，然后在子组件里调用。

16.增加传值校验PropTypes，如果不传使用默认值defaultProps，注：都要写在类的外面

17. ref更方便的赋值 ref={(input) => {this.input = input}}




#### 生命周期：

四个阶段：初始化 / 挂载 / 更新 / 卸载


初始化：

首先执行 constructor构造函数，state / props 这时初始化。
注意：严格来讲，不属于react的生命周期，而是es6的语法，但是可以当作生命周期初始化阶段用。


挂载阶段：

componentWillMount：挂载前执行，对标 beforeMount

render：正在挂载时执行，数据改变时就会执行

componentDidMount：挂载完成后执行



更新阶段：（重点）

shouldComponentUpdate：组件更新前执行，（必须返回一个布尔值，true/继续执行更新、false/停止执行更新，也就不会执行到 componentWillUpdate、render 钩子）

componentWillUpdate：也是组件更新前执行，在 shouldComponentUpdate 之后，render 之前执行

render：组件正在更新中执行

componentDidUpdate：组件更新后执行，也就是渲染成虚拟dom之后执行。

componentWillReceiveProps：特殊：
1.子组件里执行，只有子组件的 props 改变了才会执行
2.初次加载不会，只有更新会执行
3.执行顺序，在 render 之后执行， 在 componentDidUpdate 之前执行



卸载阶段：

componentWillUnmount：组件被卸载前执行
场景：子组件的 props 改变，并且子组件被删除
1.shouldComponentUpdate
2.componentWillUpdate
3.render
4.componentWillReceiveProps
5.componentWillUnmount
6.componentDidUpdate



#### 性能问题：

当父组件执行 render 时，子组件也会执行 render，造成不必要性能问题。（期望是只更新父组件数据时，子组件不渲染。）

优化：利用 shouldComponentUpdate 钩子函数，对比父组件传过来的值和子组件当前的值是否有变化，有则true，无则false
```js
shouldComponentUpdate(nextProps, nextState, nextContext) {
    // nextProps 即将传过来的父组件的值
    // this.props 传给子组件的值
    if (nextProps.content !== this.props.content) {
        return true;
    } else {
        return false;
    }
}
```


#### axios请求：

npm install --save axios

初始化数据，建议在 componentDidMount 阶段请求数据。

也可以在 componentWillMount 但是 react-RN 会有问题。
```js
componentDidMount() {
    axios.get(`xxxx`).then((res) => {
        this.setState({
            list: res.data
        })
    })
}
```