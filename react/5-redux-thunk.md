#### redux-thunk 是什么

redux-thunk 理解为 redux 的插件，可以赋予 redux 异步的能力。

reducer 中只可以写原函数不能用 axios，那么异步请求只能放到生命周期中，所以提供了 redux-thunk 中间件来写异步请求代码。


#### 为什么不把异步请求写在生命周期？

期望把所有 redux 中的数据的业务逻辑都写在 redux 而不是生命周期函数里



#### 安装

npm install --save redux-thunk


#### 引入

```js
// 必须使用 applyMiddleware 才能使用插件
import { applyMiddleware } from 'redux'
// 是 redux 提供的增强函数，使用后可以支持
import { compose } from 'redux'
// 引入 redux-thunk
import thunk from 'redux-thunk'

// 使用增强函数 合并 两个函数（redux控制台功能 / redux-thunk插件），因为 createStore() 只能接收两个参数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
// 最终创建 store 实例
const store = createStore(reducer, enhancer)
```


#### 使用

```js
// 组件中
componentDidMount () {
    const action = getTodoList()
    store.dispatch(action)
}

// actionCreators.js
const getListAction = (data) => ({
  type: GET_LIST,
  data
})
const getTodoList = () => {
  return (dispatch) => {
    axios.get('http://rap2api.taobao.org/app/mock/233908/getList').then((res) => {
      const data = res.data
      const action = getListAction(data)
      dispatch(action)
    })
  }
}
```