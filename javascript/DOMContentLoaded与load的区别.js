// DOMContentLoaded 事件

// 一般用于 触发这个事件的时候执行脚本，因为这个时候才可以访问整个页面所有的DOM元素。

// 浏览器解析完文档便能触发 DOMContentLoaded 事件，如果文档中包含脚本，脚本会阻塞文档解析，脚本又需要等前面的css加载完才能执行。



// load 事件

// 页面上所有的资源（图片，音频，视频等）被加载以后才会触发load事件，简单来说，页面的load事件会在DOMContentLoaded被触发之后才触发。



// 页面的优化中要将js放到body标签底部，原因是因为浏览器生成Dom树的时候是一行一行读HTML代码的，脚本会阻塞文档解析，script标签放在最后面就不会影响前面的页面的渲染。


// 疑问：既然Dom树完全生成好后页面才能渲染出来，浏览器又必须读完全部HTML才能生成完整的Dom树，script标签不放在body底部是不是也一样，因为dom树的生成需要整个文档解析完毕。

// 因为浏览器有一个 初次页面绘制的过程，这个过程不会等到都加载完才绘制，部分的内容将被解析并显示，也就是说浏览器能够渲染不完整的dom树和cssom，尽快的减少白屏的时间

// 但是不会减少DOMContentLoaded被触发的时间。


