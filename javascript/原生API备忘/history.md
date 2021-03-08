# history 对象


## 前进或后退指定的页面数
history.go(4)


## 后退一页
history.back()


## 前进一页
history.forward()


## 历史记录
```js
// 向历史记录的顶层追加一条记录 /a 相对路径，并把当前页面的 url 改为 /a 相对路径。
window.history.pushState(null, null, "a")

// 替换当前页在历史记录中的信息为 /a 相对路径，并把当前页面的 url 改为 /a 相对路径。
window.history.replaceState(null, null, "a")

// 监听历史记录触发
window.onpopstate
```