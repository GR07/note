#### react-redux 是什么

react-redux 在 redux 的基础上使用，它的出现是为了简化在 react 中 redux 的操作流程


#### 安装

npm install --save redux
npm install --save react-redux



#### 使用

引入提供器 Provider
```js
// 入口文件 src/index.js 引入 Provider 模块
import { Provider } from 'react-redux'
import store from './store'

// 被 Provider 包裹的组件及组件的子组件可以直接使用 store 中的数据
const App = (
  <Provider store={ store }>
    <TodoList></TodoList>
    <A></A>
    <B></B>
  </Provider>
)
ReactDOM.render(App, document.getElementById('root'));
```

引入连接器
```js
// 被 Provider 包裹的组件中 ./TodoList.js
import { connect } from 'react-redux'


// 参数一 stateToProps
const stateToProps = (state) => {
  return { // state 是 store 中的数据
    inputValue: state.inputValue,
    list: state.list
  }
}

// 参数一 stateToProps：把 store 的数据映射成 TodoList 组件中的 props 属性
export default connect(stateToProps, dispatchToProps)(TodoList);


// render 函数中使用
render() {
    return (
        <div>
            { this.props.inputValue }
        </div>
    )
}
```

```js
// stateToProps

```