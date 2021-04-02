# 用处

就是把一个对象变成响应式数据，也可以作为最小化的跨组件状态存储器。

Vue.observable({ count : 1}) 作用等同于 new vue({ count : 1})



# 场景

非父子组件通信

```js
// 随便一个js文件
// 引入vue
import Vue from 'vue
// 创建state对象，使用observable让state对象可响应
export let state = Vue.observable({
  name: '张三',
  'age': 38
})
// 创建对应的方法
export let mutations = {
  changeName(name) {
    state.name = name
  },
  setAge(age) {
    state.age = age
  }
}
```
```js
// 组件A使用（在组件B用法一样）
<template>
  <div>
    年龄：{{ age }}
    <button @click="setAge(18)">改变年龄</button>
  </div>
</template>
import { state, mutations } from '@/store
export default {
  // 在计算属性中拿到值
  computed: {
    name() {
      return state.name
    },
    age() {
      return state.age
    }
  },
  // 调用mutations里面的方法，更新数据
  methods: {
    setAge: mutations.setAge
  }
}
```