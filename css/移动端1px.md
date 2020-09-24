#### 为什么越是高清屏1px会更宽？

高清屏：是指高dpr的屏幕 
dpr：物理像素/css像素

在普通屏，1个css像素对应1个物理像素；
2倍屏中，1个css像素对应4个物理像素；
3倍屏中，1个css像素对应9个物理像素。

按照以上的置换规则后一张相同的图片在不同的设备上才会显示相同的大小。


1px的线在高清屏下本应不需要做特殊处理。
两倍屏下会自动用两排物理像素去展示‘1px’的细线，普通屏用一排物理像素去展示‘1px’的细线。

所以用两倍屏下用两排像素去展示，自然会比普通屏中用一排像素去展示看起来更粗。


#### 要解决1px问题，本质就是让高清屏用一个物理像素去展示一个css像素。

伪类实现
```scss
// 定义scss函数
// mixin.scss
$gray: #000;
@mixin border_1px($type: default, $color: $gray) {
  position: relative;
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    @if $type == default {
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      border: 1px solid $color;
    } @else if $type == top {
      top: 0;
      left: 0;
      width: 200%;
      height: 1px;
      background: $color;
    } @else if $type == bottom {
      bottom: 0;
      left: 0;
      width: 200%;
      height: 1px;
      background: $color;
    } @else if $type == left {
      top: 0;
      left: 0;
      width: 1px;
      height: 200%;
      background: $color;
    } @else if $type == right {
      top: 0;
      right: 0;
      width: 1px;
      height: 200%;
      background: $color;
    }
    transform: scale(0.5);
    transform-origin: 0 0;
  }
}
```

```scss
// 全局添加媒体查询

// 引入到main.js
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
    .border_1px{
         &::after{
             -webkit-transform: scaleY(0.7);
             transform: scaleY(0.7);
         }
    }
}

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
    .border_1px{
         &::after{
             -webkit-transform: scaleY(0.5);
             transform: scaleY(0.5);
        }
    }
}

@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
    .border_1px{
         &::after{
             -webkit-transform: scaleY(0.3);
             transform: scaleY(0.3);
        }
    }
}
```

```scss
// vue组件内
<style lang="scss" scoped>
@import "@/assets/styles/mixin";
.guor {
  color: green;
  @include border_1px(bottom);
}
</style>
```
