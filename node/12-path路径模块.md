路径模块：path
简单来说就是解析处理文件路径

```javascript
let path = require('path')

let strPath = 'https://www.cnblogs.com/dotey/p/13205902.html'
// extname 获取路径信息的 后缀名
let info = path.extname(strPath)

console.log(info) // .html

// 获取当前文件的所在磁盘目录
console.log(__dirname) // D:\project\nodeLearn\路径模块

// 获取当前文件的磁盘目录
console.log(__filename) // D:\project\nodeLearn\路径模块\index.js

// 解析路径成为一个详细对象
console.log(path.parse(__filename)) // { root: 'F:\\', dir: xxx, ext: '.js' }
```

路径拼接：
resolve、join 帮你把字符串拼接成一个绝对路径
```javascript
let arr = ['a', 'b', 'c', 'guor']

// 使用 resolve 拼接（从自动帮你从文件往上找一直到磁盘）
let info1 = path.resolve(...arr)
console.log(info1) // D:\project\nodeLearn\路径模块\a\b\c\guor

// 使用 join 拼接 （__dirname是当前文件所在的磁盘目录）
let info2 = path.join(...[__dirname, 'a', 'b', 'c', 'guor'])
console.log(info2) // D:\project\nodeLearn\路径模块\a\b\c\guor

// 获取当前文件的所在磁盘目录
console.log(__dirname) // D:\project\nodeLearn\路径模块
```

实战：
```javascript
// 思路：
// 1.先得到一个客户端请求的地址。
// 2.使用字符串方法解析到静态页在服务器路径
// 3.我们用这个路径 使用readFile去读取静态页内容

let fs = require('fs')
let path = require('path')
let str = 'https://www.cnblogs.com/node/guor.html'
let arr = str.split('/') // [ 'https:', '', 'www.cnblogs.com', 'node', 'guor.html' ]
arr = arr.slice(arr.length-2) // [ 'node', 'guor.html' ]

// 得到绝对路径 
let filePath = path.join(__dirname, ...arr) // D:\project\nodeLearn\路径模块\node\guor.html
console.log(filePath)
fs.readFile(filePath, { flags: 'r', encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})


```


系统模块：

node提供了一些 获取 操作系统相关信息 的Api

```javascript
let os = require('os')

console.log(os.cpus()) // 查看cpu的信息
console.log(os.totalmem()) // 查看内存大小
console.log(os.arch()) // 查看系统架构 32 64
console.log(os.freemem()) // 查看剩余内存
```


