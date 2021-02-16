## Suspense 异步组件

用来处理异步返回情况的展示


```vue
// 父组件
<Suspense>
    <!-- 请求成功展示的内容 -->
    <template #default>
        <AsyncShow />
    </template>
    <!-- 请求失败展示的内容 -->
    <template #fallback>
        loading...
    </template>
</Suspense>
```

```js
// AsyncShow 子组件
<template>
    <div>{{ res }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ res: 'guor' })
            }, 2000)
        })
    }
})
</script>
```