fs文件系统：

是集成在node里面的

可以读取操作系统的文件

概念：

读写文件也区分为同步和异步（传统后端比如java只有同步去获取磁盘数据没有异步）


注意！！！：20206.26---guor

最下面的流程不知道为什么只能拿到文件长度，所以改用node高度封装的api


文件读取：
```javascript
// 同步 readFileSync
let fs = require('fs')
// 第一个参数是路径，第二个参数是配置对象，注意文件的编码类型
let content = fs.readFileSync('hello.txt', {flag: 'r', encoding: 'utf-8'})
console.log(content.toString())


// 异步 readFile
// 实战中一般封装成一个promise 然后使用async await 形式
// 读取文件一般用异步readFile，因为同步会等待阻塞后面的操作
let fs = require('fs')
// 第一个参数是路径，第二个参数是配置对象，第三个参数是回调
fs.readFile('hello.txt', {flag: 'r', encoding: 'utf-8'}, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
console.log(123)

```

文件写入：
注：如果没有写入的文件，则会新建一个同名文件并写入内容
```javascript
// 异步写入
let fs = require('fs')
// 第一个参数路径，第二个参数要写入的内容，第三个参数配置对象，第四个参数回调（只有一个失败的参数）
fs.writeFile('test.txt', "我是写入的内容", {flag: 'w', encoding: 'utf-8'}, (err) => {
    if (err) {
        console.log("写入内容失败")
    } else {
        console.log("写入内容成功")
    }
})


// 同步写入
// 同理同步写入没有最后一个参数 回调
```


文件删除：
注：一但删除后即使在回收站也找不到这个文件
```javascript
// 注意删除的回调没有参数
fs.unlink(path, callback)
```








使用：

1.首先必须导入fs文件模块
```javascript
let fs = require('fs')
```
2.使用同步 or 使用异步
node 里默认是使用异步读取文件
```javascript
// 异步api
let fd = fs.open()

// 同步api
let fd = fs.openSync(path, flags, mode) // 路径、文件系统标识（读or写）、读写的模式(少用，一般默认值即可)
```
3.使用 fs.read 读取 fs.open拿到的内存标识
```javascript
// 注：（依然会区分为 同步（fs.readSync） or 异步（fs.read））
let content = fs.readSync(fd)
```


示例：
```javascript
// 导入fs模块
let fs = require('fs');
// 同步读取hello.txt文件
let fd = fs.openSync('hello.txt', 'r')
// 现在这个fd是一个标识（hello.txt已经在内存中打开了）
console.log(fd) // 3

// 读取之前必须设置一个缓冲区（buffer）
// 这个缓存区是在内存中开辟出来的类似一个数组空间，对应你要读取内容的大小
// 原因是这样读取效率要高
let buf = Buffer.alloc(20)

// 去读取fd这个标识内容
let content = fs.readSync(fd, buf, 0, 20, null)
```