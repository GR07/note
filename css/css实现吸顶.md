# 原理

position: sticky 是 css 定位新增属性；可以说是相对定位 relative 和固定定位 fixed 的结合；它主要用在对 scroll 事件的监听上；

简单来说，在滑动过程中，某个元素距离其父元素的距离达到 sticky 粘性定位的要求时比如top: 100px，position: sticky 这时的效果相当于 fixed 定位到适当位置。

```css
#stickyBox{
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
}

```

设置 position: sticky 同时给一个 (top, bottom, right, left) 之一即可


使用条件：

1. 父元素(包含祖先元素)不能 overflow: hidden 或者 overflow: auto 属性。
2. 必须指定 top、bottom、left、right 4个值之一，否则只会处于相对定位
3. 父元素的高度不能低于 sticky 元素的高度
4. sticky 元素仅在其父元素内生效
