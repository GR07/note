#### redux-saga 是什么

同样也是基于 redux 的插件 与 redux-thunk 的关系就像 可口可乐与百事可乐 做的事情基本一样。


#### 安装

npm install --save redux-saga


#### 引入

```js
// store/index.js
// 前面实例化创建引用与 redux-thunk 方式一致
import creactSagaMiddleware from 'redux-saga'
const sagaMiddleware = creactSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
// ...最终创建 store 实例
const store = createStore(reducer, enhancer)
```

```js
// 注意 createStore 后还需要使用 run 函数开启

// store/sagas.js
function* mySaga() {}
export default mySaga

// store/index.js
import mySages from './sagas.js' //写一个run函数
sagaMiddleware.run(mySages)
```


#### 使用

```js
// 组件中
componentDidMount () {
    const action = getListAction()
    store.dispatch(action)
}

// actionCreators.js
const getListAction = (data) => ({
  type: GET_ACTION,
  data
})

// 业务逻辑写在 store/sagas.js
import { takeEvery, put } from 'redux-saga/effects'
import { GET_ACTION } from './actionTypes'
function* mySaga() {
    // 等待监听 GET_ACTION 然后执行 guorFn 自定义方法
    yield takeEvery(GET_ACTION, guorFn)
}

function* guorFn() {
    // 业务逻辑代码
    console.log(123)
    const res = yield axios.get('http://rap2api.taobao.org/app/mock/233908/getList')
    const action = getListAction(res.data)
    // 使用 saga 里的 put 方法 替代 dispatch
    yield put(action)
}
export default mySaga
```