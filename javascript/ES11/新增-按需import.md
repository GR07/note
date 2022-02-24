# 按需 import

import()可以在需要的时候，再加载某个模块。

回顾 es6 的 模块语法：import 会被js引擎静态分析，会先行于模块内其他语句执行，并且 import export 只能放在模块的顶层。

所以 import 还不能替代 node 的 require() 动态加载（只有运行时才知道加载的是哪一个模块）

ES2020提案 引入import()函数，支持动态加载模块。


- 返回值 import() 返回一个 promise 对象

- import()类似于 Node 的require方法，区别主要是import是异步加载，require是同步加载。

```javascript
// 参数是要加载的模块位置
import(`././xx.js`)
```


适用场景：
```javascript
// import() 方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});

// import()允许模块路径动态生成。
import(f()).then(...);

// 可以使用对象解构赋值的语法，获取输出接口。(参数是引入的模块)
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});

```


