
注意：include 缓存的参数不是 路由的name，是组件的name

执行顺序：

首次进入：beforeRouteEnter() => created() => activated()

再次进入：beforeRouteEnter() => activated()

```javascript
export default {
 name:'a', // include 或 exclude所使用的name
 data () {},
}

// 缓存 name为a和b的组件
<keep-alive :include="['a', 'b']">
    <router-view/>
</keep-alive>
```



```javascript
<keep-alive include="test-keep-alive">
  <!-- 将缓存name为test-keep-alive的组件 -->
  <component></component>
</keep-alive>
 
<keep-alive include="a,b">
  <!-- 将缓存name为a或者b的组件，结合动态组件使用 -->
  <component :is="view"></component>
</keep-alive>
 
<!-- 使用正则表达式，需使用v-bind -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
 
<!-- 动态判断 -->
<keep-alive :include="includedComponents">
  <router-view></router-view>
</keep-alive>
 
<keep-alive exclude="test-keep-alive">
  <!-- 将不缓存name为test-keep-alive的组件 -->
  <component></component>
</keep-alive>
```