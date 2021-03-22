// vue移动端首屏加载优化

// 1.把<script> 放到 body 结束标签前面，这件事情 webpack已经帮你做了。

// 2.组件按需加载。(优化核心问题)

// 3.不打包库文件: 把库文件单独拿出来加载，不要参与打包。webpack 配置

// 4.关闭sourcemap: productionSourceMap: false .sourcemap是为了方便线上调试用的，因为线上代码都是压缩过的，导致调试极为不便，而有了sourcemap，就等于加了个索引字典，出了问题可以定位到源代码的位置。

// 5.开启gzip压缩: 这个优化是两方面的，前端将文件打包成.gz文件webpack，然后通过nginx的配置，让浏览器直接解析.gz文件。修改服务器的nginx 配置，找到conf目录下的nginx.conf ,开启gzip,并设置gzip的类型

// 6.loading效果: 在index.html里面添加个dom节点加载loading, 然后main.js里面new Vue()之前移除掉这个dom.

// 7.骨架屏:

// 骨架屏(Skeleton Screen)是指在页面数据加载完成前，先给用户展示出页面的大致结构（灰色占位图），

// 在拿到接口数据后渲染出实际页面内容然后替换掉。

// Skeleton Screen 是近两年开始流行的加载控件，本质上是界面加载过程中的过渡效果。

// 能给人一种页面内容“已经渲染出一部分”的感觉，相较于传统的 loading 效果，在一定程度上可提升用户体验。
