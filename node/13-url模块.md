url模块:

url.parse() 用于把url字符串转为对象

url.resolve() 用于把字符串合成url

更多api看官网

例子：
```javascript
// url.parse()
// 把url字符串转为对象
let url = require('url')
let httpUrl = 'https://www.bilibili.com/video/aaa?p=9'
let urlObj = url.parse(httpUrl)
console.log(urlObj) // { protocol: 'https:', host: xxx, query: xxx }


let targetUrl = 'https://www.bilibili.com/'
let httpUrl = './video/aaa.html'

let newUrl = url.resolve(targetUrl, httpUrl)
console.log(newUrl) // https://www.bilibili.com/video/aaa.html

```