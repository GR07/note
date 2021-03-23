
# 为什么 data 是 函数 不是对象

因为，vue 最终都会通过 Vue.extend() 构成组件实例，两者共用了同一个内存地址。

例如：以下 就会共享同一个 count
```js
// 构造函数
function Component(){}
Component.prototype.data = {
	count : 0
}

// 创建两个组件实例（两者共用了同一个内存地址）
const componentA = new Component()
const componentB = new Component()


// 改为函数即可（函数返回的对象内存地址并不相同）会将其作为工厂函数都会返回全新data对象
Component.prototype.data = function (){
    return {
        count : 0
    }
}
```



# 实例定义 data

可以是对象，也可以是 函数
```js
const app = new Vue({
    el:"#app",
    // 对象格式
    data:{
        foo:"foo"
    },
    // 函数格式
    data(){
        return {
             foo:"foo"
        }
    }
})
```


# 组件中定义 data

必须是函数
```js
Vue.component('component1',{
    template:`<div>组件</div>`,
    data(){
    return {
        foo:"foo"
    }
}
})
```



# 原理

自定义组件最终会进入 mergeOptions 进行选项合并，如果不是函数会发出警告。