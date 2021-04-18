# library 的作用

webpack 默认打包之后的代码形式是这样的
```js
// 代码
module.exports = 'hello world'

// 打包后
(function () {
  return 'hello world'
})()
```

打包后代码是一个自执行函数，外界想获取函数里面的返回值怎么办，那么就需要配置一个 library 
```js
// 把导出的结果赋值给 result 变量，配置了 library: 'result' 
module.exports = {
  entry: './src/utils.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'result'
  }
}

// 打包后
var result = (function () {
  return 'hello world'
})()
```
想在一个JS文件里面通过 require 导入来使用，需要这么配置
```js
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
}

// 打包后
module.exports = (function () {
  return 'hello world'
})()

// 使用
import result from './bundle'
console.log(result)
```

library / libraryTarget 两个配置同时使用，生效的是第二种模式。