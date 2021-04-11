# 组件上使用

就是 :value @input 的语法糖


# Vue 2 中 v-model

<search-input v-model="searchValue"><search-input>

相当于
<search-input :value="searchValue" @input="searchValue=$event"><search-input>

也可以改名
```js
// 子组件
export default {
    model:{
        prop: 'search',
        event:'change'
    }
}
```


# .sync

this.$emit('update:visible', false)
// vue2
<modal :visible.async="isVisible"></modal>

// 相当于
<modal :visible="isVisible" @update:visible="isVisible = $event"></modal>



# vue3 中 v-model

<modal v-model="isVisible"></modal>
<!-- 相当于 -->
<modal :modelValue="isVisible" @update:modelValue="isVisible = $event"></modal>


<modal v-model:visible="isVisible" v-model:content="content"></modal>
<!-- 相当于 -->
<modal :visible="isVisible" :content="content" @update:visible="isVisible" @update:content="content" />