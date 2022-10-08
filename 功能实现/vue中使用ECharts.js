// mounted 阶段时候：

// 第一步：实例化对象 this.chart = echarts.init(this.$refs.chart);


// 第二步：请求数据 给配置对象赋值。

// 这个配置对象一般先把除了data外的属性设置好，然后等数据请求完成后只给data赋值即可。

// 注意在请求数据失败时候 需要展示一个无数据的视图。


// 第三步：监听 resize 事件 重置图表

// window.addEventListener("resize", this.chart.resize()); 

// 所以会有一个初始化加载动画的效果。记得销毁前beforeDestroy移除事件window.removeEventListener("resize", this.resize);