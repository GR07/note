## Performance API 是什么？

用于访问当前页面性能的各种相关的信息


Performance对象 4个属性：

timing 对象：
从输入url到用户可以使用页面的全过程时间统计，会返回一个PerformanceTiming对象，单位均为毫秒。

例如要计算出发送请求到接受完数据所消耗的时间。
```javascript
const timing = window.performance.timing
// requestStart 浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
// responseEnd 浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳
const contactDuration = timing.responseEnd - timing.requestStart
```
性能指标：

DNS查询耗时 ：domainLookupEnd - domainLookupStart
TCP链接耗时 ：connectEnd - connectStart
request请求耗时 ：responseEnd - responseStart
解析dom树耗时 ： domComplete - domInteractive
白屏时间 ：responseStart - navigationStart
domready时间(用户可操作时间节点) ：domContentLoadedEventEnd - navigationStart
onload时间(总下载时间) ：loadEventEnd - navigationStart

包含的属性：
navigationStart	准备加载新页面的起始时间
redirectStart	如果发生了HTTP重定向，并且从导航开始，中间的每次重定向，都和当前文档同域的话，就返回开始重定向的timing.fetchStart的值。其他情况，则返回0
redirectEnd	如果发生了HTTP重定向，并且从导航开始，中间的每次重定向，都和当前文档同域的话，就返回最后一次重定向，接收到最后一个字节数据后的那个时间.其他情况则返回0
fetchStart	如果一个新的资源获取被发起，则 fetchStart必须返回用户代理开始检查其相关缓存的那个时间，其他情况则返回开始获取该资源的时间
domainLookupStart	返回用户代理对当前文档所属域进行DNS查询开始的时间。如果此请求没有DNS查询过程，如长连接，资源cache,甚至是本地资源等。 那么就返回 fetchStart的值
domainLookupEnd	返回用户代理对结束对当前文档所属域进行DNS查询的时间。如果此请求没有DNS查询过程，如长连接，资源cache，甚至是本地资源等。那么就返回 fetchStart的值
connectStart	返回用户代理向服务器服务器请求文档，开始建立连接的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。则返回domainLookupEnd的值
(secureConnectionStart)	可选特性。用户代理如果没有对应的东东，就要把这个设置为undefined。如果有这个东东，并且是HTTPS协议，那么就要返回开始SSL握手的那个时间。 如果不是HTTPS， 那么就返回0
connectEnd	返回用户代理向服务器服务器请求文档，建立连接成功后的那个时间，如果此连接是一个长连接，又或者直接从缓存中获取资源（即没有与服务器建立连接）。则返回domainLookupEnd的值
requestStart	返回从服务器、缓存、本地资源等，开始请求文档的时间
responseStart	返回用户代理从服务器、缓存、本地资源中，接收到第一个字节数据的时间
responseEnd	返回用户代理接收到最后一个字符的时间，和当前连接被关闭的时间中，更早的那个。同样，文档可能来自服务器、缓存、或本地资源
domLoading	返回用户代理把其文档的 "current document readiness" 设置为 "loading"的时候
domInteractive	返回用户代理把其文档的 "current document readiness" 设置为 "interactive"的时候.
domContentLoadedEventStart	返回文档发生 DOMContentLoaded事件的时间
domContentLoadedEventEnd	文档的DOMContentLoaded 事件的结束时间
domComplete	返回用户代理把其文档的 "current document readiness" 设置为 "complete"的时候
loadEventStart	文档触发load事件的时间。如果load事件没有触发，那么该接口就返回0
loadEventEnd	文档触发load事件结束后的时间。如果load事件没有触发，那么该接口就返回0


navagation 对象：是如何导航到当前文档的

有两个属性：type / redirectCount

type：
表示如何导航到当前页面，有4个值
type = 0 表示当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址访问的。
type = 1 表示当前页面是点击刷新或者调用Location.reload()方法访问的。
type = 2 表示当前页面是通过历史记录或者前进后退按钮访问的。
type = 255 其他方式访问的

redirectCount：
表示到达当前页面之前经过几次重定向。


origin 属性：表示 Performance 测试开始的时间（高精度时间戳 千分之一毫秒）

onresourcetimingbufferfull 属性：当缓冲区内容满时，触发一个回调函数。

memory 对象：描述内存多少，是在Chrome中添加的一个非标准属性。
jsHeapSizeLimit: 内存大小限制
totalJSHeapSize: 可使用的内存
usedJSHeapSize: JS对象(包括V8引擎内部对象)占用的内存，不能大于totalJSHeapSize，如果大于，有可能出现了内存泄漏



方法：
getEntries()：获取所有资源请求的时间数据，这个函数返回一个按startTime排序的对象数组

{
    name：资源名称，资源的绝对路径
    startTime：开始时间
    duration：加载时间
    entryType：资源类型，entryType类型不同数组中的对象结构也不同，如下说明
    initiatorType：谁发起的请求
}

entryType: {
    值mark / 类型PerformanceMark // 通过mark()方法添加到数组中的对象 
    值measure / 类型PerformanceMeasure // 通过measure()方法添加到数组中的对象
    值paint / 类型PerformancePaintTiming // 值为first-paint'首次绘制、'first-contentful-paint'首次内容绘制。
    值resource / 类型PerformanceResourceTiming // 所有资源加载时间
}

initiatorType: {
    link/script/img/iframe 等	通过标签形式加载的资源，值是该节点名的小写形式
    css 通过css样式加载的资源，比如background的url方式加载资源
    xmlhttprequest/fetch 通过xhr加载的资源
}

//根据entryType类型返回的不同对象

PerformanceMark:{  // 通过mark()方法添加的对象
    entryType："mark"
    name：调用mark()方法时自定义的名字
    startTime: 做标记的时间
    duration：0
}

PerformanceMeasure:{  // 通过measure()方法添加的对象
    entryType："measure"
    name：调用measure()方法时自定义的名字
    startTime: 开始量的时间
    duration：标记的两个量的时间间隔
}
PerformancePaintTiming:{ // paint Chrome 60 新增类型
    entryType："paint"
    name：first-paint" 或 "first-contentful-paint"
    startTime: 绘制的时间戳
    duration： 0 
}
PerformanceResourceTiming:{  // resource 可以用来做一个精准的进度条
    entryType："resource"
    name：资源的绝对路径,即URL
    startTime: 即将抓取资源的时间，
    duration： responseEnd - startTime
    initiatorType：略！/:傲娇脸
    //其他属性请参考performance.timing
}
PerformanceNavigationTiming:{ // navigation 现除chrome和Opera外均不支持 导航相关信息
    entryType："navigation"
    name：本页路由，即地址栏看到的地址
    startTime: 0
    duration： loadEventEnd - startTime 
    initiatorType："navigation"
    //其他属性请参考performance.timing
}


getEntriesByName(name,type[optional])
getEntriesByType(type)
name:想要筛选出的资源名
type:entryType的值中一个
返回值仍是一个数组，这个数组相当于getEntries()方法经过所填参数筛选后的一个子集

clearResourceTimings();
该方法无参数无返回值，可以清除目前所有entryType为"resource"的数据，用于写单页应用的统计脚本非常有用

