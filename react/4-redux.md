##### 为什么用redux？

一句话就是，通过统一管理状态，达到分离组件降低耦合度的目的。

因为 react 中，当子组件中的数据改变了，会一层层向上通知父组件，非常繁琐。
可以把 redux 看作是一个数据中心，当子组件的状态改变了，直接通知数据中心，然后数据中心收到通知后，自动向所有需要的子组件通知更新。

redux 不可以使用异步请求获取数据

#### 工作流程
   
  1.组件首先通过 ActionCreators 去找 store 索要需要的 state
  2.store 再通过 reducers（管理state的地方）查找。
  3.找到后，返回到 store
  4.store 再返回给组件




#### 使用

demo 在 ReactDemo/demo02


##### 安装：
  <!-- 注意这是 redux 不是 react-redux -->
  npm install --save redux


##### 目录结构：

  1.创建数据中心仓库store
  ```js
  // src/store/index.js
  import { createStore } from 'redux'
  // 引入 reducer 文件
  import reducer from './reducer'
  const store = createStore(reducer)
  export default store
  ```
  
  2.创建 reducer，用于管理操作 store
  ```js
  // src/store/index.js
  // 就是 export 一个 方法，方法接收两个参数
  const defaultState = {
    list: [],
    inputVal: ''
  }
  export default (state = defaultState, action) => {
    return state;
  }
  ```

##### 交互应用：

  1.组件中如何拿到 store 中的数据
  ```js
  import store from './store/index.js'
  constructor(props) {
    super(props)
    console.log(store.getState().list) // 可以拿到 reducer 里面存的数据
    this.state = store.getState() // 把 store 数据赋值给当前组件
  }
  ```

  2.组件中如何去改变 store 中的数据
  ```js
  // 1.组件中创建一个 action 对象
  changeInput(e) {
    const action = {
      type: 'guor', // 随便起个唯一标记
      value: e.target.value // 当前更新的值
    }
  }

  // 2.把数据通过 store.dispatch 传递给 数据仓库
  changeInput(e) {
    const action = {}
    store.dispatch(action)
  }

  // 3.只要执行 store.dispatch 派发到数据中心，reducer 中的匿名方法就会自动接收到 action 对象
  // reducer.js
  export default (state = defaultState, action) => {
    if (action.type === 'guor') {
      // 深拷贝是因为不可以直接改变 state 的状态
      let newState = JSON.parse(JSON.stringify(state))
      newState.inputVal = action.value
      // 最后必须返回 state 对象，本质上是 return 给了store，然后在 store 里自动更新了 store 的数据，而不是在 reducer 里直接修改的 store 数据。
      return newState;
    }
    return state;
  }

  // 4.最后组件更新
  // 要在组件 constructor 中 订阅
  constructor(props) {
    // ...
    // 订阅 store 中的状态变化，执行一个方法
    store.subscribe(this.storeChange)
  }
  // 这个方法只做一件事情，更新组件 setState
  storeChange() {
    this.setState(store.getState())
  }
  ```
  


#### 工作使用技巧


##### action.type 统一管理

因为项目中一定会有很多 action.type，所以可以建一个模块统一管理。
```js
// ./store/actionTypes
export const A_TYPE = aType
export const B_TYPE = bType

// 组件中使用
import { A_TYPE, B_TYPE } from './store/actionTypes'
const action = {
  type: A_TYPE,
  inputVal: 'asd'
}
store.dispatch(action)
```

##### action 统一管理

因为项目中一定会有很多 action，所以可以建一个模块统一管理。
```js
// ./store/actionCreators.js
import { A_TYPE, B_TYPE } from './store/actionTypes'
const changeInputAction = (value) => ({
  type: A_TYPE,
  value
})
const changeListAction = (value) => ({
  type: B_TYPE,
  value
})
export { changeInputAction, changeListAction }
```



#### 结合 axios 使用

redux 是没有异步能力的，所以需要在组件初始化调用接口，然后 dispatch(action)
```js
componentDidMount() {
  axios.get(`xxx`).then((res) => {
    const action = {
      type: 'xxx',
      data: res
    }
    store.dispatch(action)
  })
}
```






首先使用提供器：Provider

包裹住要使用的组件
写在入口文件里：
import { Provider } from 'react-redux'
import store from './store'
<Provider store={ store }></ Provider> 标签内都可以访问到store中的数据


然后使用连接器：connect

TodoList组件中：
// 作用把 store 中的 state 映射成 props 属性
const stateToProps = (state) => {
return {
inputValue: state.valueInput
}
}

export default connect(stateToProps, null)(TodoList)

然后在jsx语句中 直接 this.props.inputValue 就可以获取到了
