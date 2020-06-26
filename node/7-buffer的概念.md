了解一下即可：
一般用不到，除非用js写神经网络，因为神经网络需要大量计算，这个可以提高速度，比数组快10-100倍

概念：

buffer提供一个数组的缓存区

buffer存在的意义：

1.因为我们js数组不能进行二进制数据的操作

2.js数组不像java等后端语言；创建一个数组会在内存里开辟一个固定大小的缓存区并且数据是连在一起的，这样查找效率会很高。


演示：
```javascript
// 字符串 转为 buffer对象
let str = 'hello'
// 存在缓存区的是二进制的内容
let buf = Buffer.from(str)
console.log(buf) // 输出的是以16进制的形式展示2进制的内容


// buffer对象 转为 字符串
console.log(buf.toString())
```


实际场景：
```javascript
// 开辟一个空的buffer（缓存区）
// 参数 存放的数据的尺寸大小 
let buf = Buffer.alloc(10)
buf[0] = 255
console.log(buf) // ff 00 00 00 00 00 00 00 00 00
// 存入超过大小10的字节 则会截取
buf[0] = 256
console.log(buf) // 00 00 00 00 00 00 00 00 00 00


// 这个和 Buffer.alloc 对比
// 这个创建完成后不会帮你清空数据，性能会高，但不安全
let buf = Buffer.allocUnsafe(10)
```