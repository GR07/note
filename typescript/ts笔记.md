TypeScript是微软出的编程语言

TypeScript 是 JavaScript 的超集，最终会被编译成 JavaScript

他们之间就像 less sass stylus 和 css 之间的关系一样，最终被编译成css

支持：可以运行在node deno 任何支持es3+的js引擎中，在ts中也可以写js向下兼容

作用：TypeScript主要作用是在 js 的基础上增加类型检查，提高代码健壮性，后期维护容易。


使用：

1.全局安装 npm install -g typescript
2.新建一个后缀 .ts 文件
3.运行 tsc 文件名.ts 即可

```JavaScript
// hello.ts
// 这里可以写js代码
function log(msg) {
    console.log(`hello${msg}`)
}
log('ts')
```
tsc hello.ts

运行后目录下会生成一个同名js文件，内容就是ts代码编译后的js


类型注解：
```JavaScript
// hello.ts
function log(msg: string) {
    console.log(`hello${msg}`)
}
log('ts') // 没问题
log(123) // tsc 运行后 会在命令行报错 虽然也会转换成js　但是结果是不可预测的
```

接口：
```JavaScript
interface Box {
    name: string,
    size: Number,
    desc: string 
}
function logBox(box: Box) {
    console.log(`箱子名称:${box.name}, 箱子大小:${box.size}, 箱子描述:${box.desc}`)
}
let paperBox = {
    name: '纸箱',
    size: 100,
    desc: '我是一个纸箱'
}
logBox(paperBox)
```