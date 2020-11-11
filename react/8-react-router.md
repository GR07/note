#### react-router 是基于 react 的路由库


#### 安装

npm install --save react-router-dom


#### 使用
demo地址：ReactRouterDemo/demo01

基础用法
```js
// ./入口组件.js
// BrowserRouter 浏览器路由 最外层的包裹
import { BrowserRouter as Router } from 'react-router-dom'
// Route 路由配置 <Route path="/list/:id" component={List} />
// 注：就像在 vue-router 中的对象数组配置规则一样
import { Route } from 'react-router-dom'
// Link 路由中的<a>标签
import { Link } from 'react-router-dom'
// 组件一
import Index from './Pages/Index'
// 组件二
import List from './Pages/List'
// export 的组件
// 逻辑就是：点击首页Link 就会匹配到 path="/" component={Index} 展示 Index组件
function AppRouter() {
    return (
        <Router>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/list/123">列表</Link></li>
            </ul>
            <Route path="/" exact component={Index} />
            <Route path="/list/:id" component={List} />
        </Router>
    )
}

export default AppRouter
```

路由传参
```js
// 路由传参
<Router>
    <ul>
        <li><Link to="/list/123">列表</Link></li>
    </ul>
    <Route path="/list/:id" component={List} />
</Router>

// ./List.js 组件获取参数
componentDidMount() {
    console.log(this.props.match.params.id) // 123
    // 添加到 state
    this.setState({ id: this.props.match.params.id })
}
```

重定向

检测到跳转到index页面时，会自动定位到home页面。

重定向分为两种方式：标签式 / 函数式
```js
// 标签式 => 适合简单逻辑（比如一个新的活动专题，到首页的时候需要跳过去）
// 如果是进到这个组件，会自动跳到 home
import { Redirect } from 'react-router-dom'
render() {
    return (
        <div><Redirect to={`/home`} /></div>
    )
}

// 函数式 => 适合复杂逻辑
// 如果是进到这个组件，会自动跳到 home
class Index extends Component {
    constructor(props) {
        super(props);
        // 初始的时候直接跳
        this.props.history.push("/home/")
    }
}
render() {
    return (
        <div>xxx</div>
    )
}
```

路由嵌套结合动态路由


demo地址（标准项目的路由配置）：ReactRouterDemo/demo02