# loader

因为 webpack 自身只能理解 JavaScript 和 JSON 文件，进行打包。

loader 让 webpack 能够去处理其他类型的文件。

并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

配置里的 module.rules 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 Loader 去加载和转换。


# loader 有两个属性：

+ test：哪些文件会被转换。

+ use：表示进行转换时，应该使用哪个 loader。


# 注意：在 webpack 配置中定义 rules 时，要定义在 module.rules 而不是 rules 中。

```js
// npm i -D style-loader css-loader

// 告诉 Webpack 在遇到以 .css 结尾的文件时先使用 css-loader 读取 CSS 文件，再交给 style-loader 把 CSS 内容注入到 JavaScript 里
module.exports = {
  module: {
    rules: [
        // 两个必须属性：test 和 use
        {
            // 用正则去匹配要用该 loader 转换的 CSS 文件
            test: /\.css$/,
            // use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
            // 每一个 Loader 都可以通过 URL querystring 的方式传入参数，例如 css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。具体支持去看 相应的 loader 介绍
            use: ['style-loader', 'css-loader?minimize'],
        }
    ]
  }
};


// 还可以通过 Object 传入，等同于上面
use: [
  'style-loader', 
  {
    loader:'css-loader',
    options:{
      minimize:true,
    }
  }
]
```


# 打包后 css 文件会一起被打进 js 文件。

第一次看到 CSS 被写在了 JavaScript 里！这其实都是 style-loader 的功劳，它的工作原理大概是把 CSS 内容用 JavaScript 里的字符串存储起来， 在网页执行 JavaScript 时通过 DOM 操作动态地往 HTML head 标签里插入 HTML style 标签。 也许你认为这样做会导致 JavaScript 文件变大并导致加载网页时间变长，想让 Webpack 单独输出 CSS 文件，就需要插件了（pulgin）。