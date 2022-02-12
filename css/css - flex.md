
        /* 6个容器属性 */

        /* 分为 主轴（x轴），交叉轴（y轴） */




        /* flex-direction: 决定主轴的方向（即项目的排列方向） */
        
        /* row（默认值）：主轴为水平方向，起点在左端。 */
        /* row-reverse：主轴为水平方向，起点在右端。 */
        /* column：主轴为垂直方向，起点在上沿。 */
        /* column-reverse：主轴为垂直方向，起点在下沿。 */




        /* flex-wrap: 如果一条轴线排不下，如何换行 */

        /* nowrap（默认）：不换行。 */
        /* wrap：换行，第一行在上方。 */
        /* wrap-reverse：换行，第一行在下方。 */




        /* flex-flow: <flex-direction> || <flex-wrap> 是前面两个属性的简写 */




        /* justify-content: 项目在主轴（x轴）上的对齐方式。 */

        /* flex-start（默认值）：左对齐 */
        /* flex-end：右对齐 */
        /* center： 居中 */
        /* space-between：两端对齐，项目之间的间隔都相等。 */
        /* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。 */




        /* align-items: 项目在交叉轴（y轴）上的对齐方式。 */
        
        /* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。 */
        /* flex-start：交叉轴的起点对齐。 */
        /* flex-end：交叉轴的终点对齐。 */
        /* center：交叉轴的中点对齐。 */
        /* baseline: 项目的第一行文字的基线对齐。 */




        /* align-content: 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。 */







        /* 6个item属性 */





        /* order: 定义项目的排列顺序。数值越小，排列越靠前，默认为0。 */




        /* flex-grow: 定义item占容器的比例，默认为0 */




        /* flex-shrink: 如果空间不足，item的缩小比例，默认为1 */




        /* flex-basis: 先固定当前item占据的主轴（x轴）空间，剩下的多余空间再分配给其他item。默认值auto（原始的大小）可以350px */




        /* flex: 是前面三个属性（grow、shrink、basis）的简写，默认值为0 1 auto。后两个属性可选。两个快捷值：auto (1 1 auto) 和 none (0 0 auto) */




        /* align-self: 允许单个item有与其他item不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性。 */

        /* auto（默认值）: 表示继承父元素的align-items属性 */
        /* stretch：如果项目未设置高度或设为auto，将占满整个容器的高度。 */
        /* flex-start：交叉轴的起点对齐。 */
        /* flex-end：交叉轴的终点对齐。 */
        /* center：交叉轴的中点对齐。 */
        /* baseline: 项目的第一行文字的基线对齐。 */






# 场景

- 左固定 右自适应
```html
<div class="g-app-wrapper">
    <div class="g-sidebar"></div>
    <div class="g-main"></div>
</div>
<style>
.g-app-wrapper {
    display: flex;
    min-width: 1200px;
}
.g-sidebar {
    flex-basis: 250px;
    margin-right: 10px;
}
.g-main {
    flex-grow: 1;
}
</style>
```