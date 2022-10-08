```js
// 下面是一个环形进度条
<svg width="230" height="230" viewBox="0 0 230 230" transform="rotate(230) scale(1, -1)">
    // 创建渐变色
    <defs>
        <linearGradient id="orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(5, 89, 255, 1)" stop-opacity="1" />
            <stop offset="100%" stop-color="rgba(16, 187, 253, 1)" stop-opacity="1" />
        </linearGradient>
    </defs>
    
    // 底圆环　　　　　　　　
    <circle cx="115" cy="115" r="87" fill="none" stroke="#f7f7f7" stroke-width="22" />
    // 上圆环　　　　　　　　
    <circle cx="115" cy="115" r="87" fill="none" stroke="url(#orange)" stroke-dashoffset="150" stroke-dasharray="465" stroke-width="12" stroke-linecap="round" />
</svg>

// svg:

// witdh:230单位，
// height: 230单位 (注意不是px 是单位)
// viewBox="x轴摆放的位置 y轴摆放的位置 在视图内显示的x大小 在视图内显示y的大小", svg 可以理解为相框，viewBox 相当于设定内容的摆放位置与缩放
// transform 与 css 理解一致


// defs: 创建填充颜色(可以渐变之类的)


// circle: 表示设置圆标签

// cx: 圆心在x轴的位置
// cy: 圆心在y轴的位置
// fill: 设置绘制图案的填充颜色或图案
// stroke: 设置填充颜色，可以引用 defs创建的渐变色 url(#orange)
// stroke-width: 绘制线的宽度
// stroke-dasharray: 设置实线和虚线的宽度
// stroke-dashoffset: 实线虚线绘制的起点距路径开始的距离
// stroke="url(#orange)" 引用defs 上的渐变色
```


在element-ui中都可以通过以下选择器修改圆环的渐变色：
.my /deep/ svg > path:nth-child(2) {
    stroke: url(#blue);
}