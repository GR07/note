

# 选择器

```html
<style>
/* 匹配属于其父元素的第 N 个子元素，n 可以是数字、关键词或公式 :nth-child(n) */


/* 匹配属于父元素的特定类型的第 N 个子元素，n 可以是数字、关键词或公式 :nth-of-type(n) */


/* 匹配其父元素的最后一个子元素，且是特定的类型，才可以生效 :last-child */


/* 匹配其父元素的最后一个指定 class 的元素 :last-of-type */
.xxx {
  .guor:last-of-type {
    opacity: 0.75;
  }
}


/* 除了最后一个元素 :not(:last-child) */
.tag {
  padding: 3px 8px;
  background: #f4f7fc;
  border-radius: 2px;
  margin-right: 8px;
  color: #03050d;
  font-size: 12px;
}
.tag:not(:last-child) {
  color: aquamarine;
}


/* 只选择直接子元素 */
>.item

</style>
```

# 改变 placeholder 样式

```html
<style>
::-webkit-input-placeholder {
  color: #f00;
}

input:-moz-placeholder {
  color: #f00;
}
</style>
```

# 首行缩进

text-indent: 5em; 无法将该属性应用于行内元素，属性可以继承


# 文字间隔

word-spacing 属性接受一个正长度值或负长度值


# 字母间隔

letter-spacing 属性与 word-spacing 的区别在于，字母间隔修改的是字符或字母之间的间隔。*/


# 文本大小写

text-transform: uppercase


# 文本装饰线

text-decoration: none;


# 文档空白符处理

- 合并空格忽略回车：white-space: normal;

- 保留原始回车和空格：white-space: pre-wrap;

- 只保留回车：white-space: pre-line;


# 剪裁图片

```html
<style>
img {
  position: absolute;
  clip: rect(0px 50px 200px 0px)
}
</style>
```


# 最大高度滚动

```html
<style>
.wrap {
  max-height: 217px;
  overflow: hidden;
}
</style>
```



# 应用字符编码

```html
<div v-text="remark"style="white-space: pre-wrap;"></div>
```


# 设定一个宽高相等的容器

```html
<div class="image-header">
  <img />
</div>
<style>
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%
    }
  }
</style>
```


# 右对齐

- margin-left: auto 代替 float: right 实现右对齐

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
.father {
  width: 300px;
  background-color: #f0f3f9;
}
.son {
  width: 200px;
  height: 120px;
  margin-left: auto;
  background-color: #cd0000;
}
</style>
```


# 水平垂直方向居中

- magin: atuo 配合绝对定位实现

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
.father {
  width: 300px;
  height: 150px;
  background-color: #f0f3f9;
  position: relative;
}

.son {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 100px;
  background-color: #cd0000;
  margin: auto;
}
</style>
```


# footer 固定在视窗底部

如果整个页面的内容高度大于视窗的高度，则 footer 正常流排布

- 方案一 justify-content: space-between 

- 方案二 margin-top: auto

```html
<div class="g-container">
    <div class="g-real-box">
        ...
    </div>
    <div class="g-footer"></div>
</div>
<style>
.g-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.g-footer {
    margin-top: auto;
    flex-shrink: 0;
    height: 30px;
    background: deeppink;
}
</style>
```

# 单行文本，使用单行省略

```html
<style>
{
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
```

# 多行文本的超长省略

```html
<style>
{
  width: 200px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
```

# 文本超出容器不折行

```html
<div class="wrap"></div>
<style>
  .wrap {
    overflow: hidden;
    white-space: nowrap;
  }
</style>
```


# 最小宽度 min-width

当内容比较少的时候是没问题的，但是当内容比较长，就容易出现问题。

```html
<style>
.btn {
    min-width: 88px;
    padding: 0 16px
}
</style>
```


# 0 内容展示

不同的情况可能对应不同的 0 结果页面，附带不同的操作引导。

- 数据为空：其中又可能包括了用户无权限、搜索无结果、筛选无结果、页面无数据

- 异常状态：其中又可能包括了网络异常、服务器异常、加载失败等待



# 给图片同时设置高宽

- 用到图片时，用 span 标签，并设置为背景图片，设置固定宽高width/height，设置background-size（图片大小），设置background-repeat


- 给 <img> 标签同时写上高宽，可以在图片未加载之前提前占住位置，避免图片从未加载状态到渲染完成状态高宽变化引起的重排问题。

- object-fit 如何适应它的父容器的高宽，避免图片被拉伸

  - object-fit配套属性 object-position

    类似于 background-position），默认是 object-position: 50% 50%，如果你不希望图片居中展示，可以使用它去改变图片实际展示的 position 。


```html
<ul class="g-container">
    <li>
        <img width="150" height="100" src="http://placehold.it/150x100">
        <p>图片描述</p>
    </li>
</ul>
<style>
ul li img {
    width: 150px;
    height: 100px;
    /* 使图片内容在保持其宽高比的同时填充元素的整个内容框 */
    object-fit: cover;
}
</style>
```


# 考虑屏幕 dpr -- 响应式图片

<img> 标签是有提供相应的属性 srcset 让我们进行操作的

```html
<img src='photo@1x.png'
   srcset='photo@1x.png 1x,
           photo@2x.png 2x,
           photo@3x.png 3x' 
/>
<style>
ul li img {
    width: 150px;
    height: 100px;
    /* 使图片内容在保持其宽高比的同时填充元素的整个内容框 */
    object-fit: cover;
}
</style>
```

上面这是比较旧的写法，srcset 新增了新的 w 宽度描述符，需要配合 sizes 一起使用

利用 srcset，我们可以给不同 dpr 的屏幕，提供最适合的图片
```html
<img 
        src = "photo.png" 
        sizes = "(min-width: 600px) 600px, 300px" 
        srcset = "photo@1x.png 300w,
                       photo@2x.png 600w,
                       photo@3x.png 1200w"
>
```


# 图片链接挂了

1. 利用图片加载失败，触发 <img> 元素的 onerror 事件，给加载失败的 <img> 元素新增一个样式类

2. 利用新增的样式类，配合 <img> 元素的伪元素，展示默认兜底图的同时，还能一起展示 <img> 元素的 alt 信息

```html
<img src="test.png" alt="图片描述" onerror="this.classList.add('error');">
<style>
img.error {
    position: relative;
    display: inline-block;
}

img.error::before {
    content: "";
    /** 定位代码 **/
    background: url(error-default.png);
}

img.error::after {
    content: attr(alt);
    /** 定位代码 **/
}
</style>
```
我们利用伪元素 before ，加载默认错误兜底图，利用伪元素 after，展示图片的 alt 信息：


# 滚动平滑

使用 scroll-behavior: smooth，可以让滚动框实现平稳的滚动，而不是突兀的跳动。

```html
<div class="g-container">
  <nav>
    <a href="#1">1</a>
    <a href="#2">2</a>
    <a href="#3">3</a>
  </nav>
  <div class="scrolling-box">
    <section id="1">First section</section>
    <section id="2">Second section</section>
    <section id="3">Third section</section>
  </div>
</div>
<style>
.scrolling-box {
    scroll-behavior: smooth;
}
</style>

```

使用 scroll-snap-type 优化滚动效果

让滚动操作结束后，元素停止在适合的位置。



# 优化手势
```html
<style>
{
    cursor: pointer;    // 可点击
    cursor: not-allowed;    // 不可点击
    cursor: wait;    // loading
}
/* 对于一些可输入的 Input 框，使用 cursor: text，对于提示 Tips 类使用 cursor: help，放大缩小图片 zoom-in、zoom-out 等等： */
</style>
```


# 点击区域优化 -- 伪元素扩大点击区域

在按钮的伪元素没有其它用途的时候，这个方法确实是个很好的提升用户体验的点。

```html
<style>
  .btn::befoer{
    content:"";
    position:absolute;
    top:-10px;
    right:-10px;
    bottom:-10px;
    left:-10px;
  }
</style>
```


# 快速选择优化 -- user-select: all

user-select: all，可以将需要一次选中的内容进行包裹，用户只需要点击一次，就可以选中该段信息：


```html
<style>
  .g-select-all {
      user-select: all
  }
</style>
```

选中样式优化 -- ::selection

控制选中的文本的样式（只能控制color, background, text-shadow）


# 添加禁止选择 -- user-select: none

无论点击的频率多快，都不会被选中

```html
<style>
  {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
</style>
```


# 字体优化

最新的规范建议我们更多的去使用系统默认字体。也就是  CSS Fonts Module Level 4 -- Generic font families[16] 中新增的 font-family: system-ui 关键字。

默认使用特定操作系统的系统字体可以提高性能，因为浏览器或者 webview 不必去下载任何字体文件，而是使用已有的字体文件。font-family: system-ui 字体设置的优势之处在于它与当前操作系统使用的字体相匹配，对于文本内容而言，它可以得到最恰当的展示。

font-family: system-ui 能够自动选择本操作系统下的默认系统字体。

天猫[17]：font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
Github[18]：font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;

1. 尽量使用系统默认字体

2. 兼顾中西，西文在前，中文在后

3. 兼顾多操作系统

4. 兼顾旧操作系统，以字体族系列 serif 和 sans-serif 结尾




参考：https://mp.weixin.qq.com/s/xpcZlmtmVab461cvbsDx5Q
