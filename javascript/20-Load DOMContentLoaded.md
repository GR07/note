# load / DOMContentLoaded 区别


## 结论

首先页面渲染分为: 先构建 DOM => 然后再完成图片之类的渲染。

DOMContentLoaded 事件将在 DOM 层次结构完全构建后立即触发。

load 事件在所有图像和 CSS 文件完成加载后执行。


## DOMContentLoaded 事件

这个时候才可以访问整个页面所有的DOM元素。

浏览器解析完 Dom 便触发 DOMContentLoaded。

在 load 事件之前触发。


## load 事件

页面上所有的资源（图片，音频，视频等）被加载以后会触发 load。

在 DOMContentLoaded 事件之后触发。



浏览器有一个初次页面绘制的过程，这个过程不会等到都加载完才绘制，部分的内容将被解析并显示，浏览器能够渲染不完整的dom树和cssom，尽快的减少白屏的时间。

但是不会减少DOMContentLoaded被触发的时间。





# <script> 影响页面

1. 浏览器渲染页面时遇到 script 标签时会下载并执行当前文件。

2. 下载不会阻塞页面渲染，但执行会阻塞页面渲染。

3. script 之间是相互阻塞的，按照引入顺序。


## 解决方案

1. script 标签放到 </ body> 前。（对于旧浏览器来说这是唯一的选择）

2. script 标签添加 defer / async 属性，使 js 的加载与 HTML 的解析并行进行。

### defer / async

### defer

1. 异步加载脚本。

2. 加载完成的脚本在 HTML 解析完之后 DOMContendLoaded 之前执行。

3. 多个 defer 之间按照在文档的顺序来加载和执行。


### async

1. 异步加载脚本。

2. 加载完成后立即执行。

3. 多个 async 之间会乱序下载执行。


### 总结

综上所述，通过调整外部脚本的加载和执行次序来优化首屏渲染速度诸多方案中，
为 script 标签添加 defer 是最优的，因为 async 是乱序的。