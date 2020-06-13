## 重置data

```javascript
// this.$data 当前data
// this.$options.data() // 初始化时的data
Object.assign(this.$data, this.$options.data())
```

注意事项：
如果data里面有引用this.属性 --------- undefined

和Vue实例的初始化相关

1、new Vue的时候传了一个对象，把该对象记为options，
Vue将options中自定义的属性和Vue构造函数中定义的属性合并为vm.options.data()
这个this指向vm.options下，所以this.methodA和this.B为undefined。

prop和methods的初始化在data之前


总结：
data()中若使用了this来访问props或methods，在重置data时，注意this.options.data()的this指向，最好使用this.$options.data.call(this)。

