# BigInt

是一种内置对象，它提供了一种方法来表示大于 2的53次方 \- 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。解决大整数计算失精问题。


- 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

```javascript
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n

// 写法二
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum)
```

- 运算

```js
let number = BigInt(2);
let a = number + 2n; // 4n
let b = number * 10n; // 20n
let c = number - 10n; // -8n
console.log(a);
console.log(b);
console.log(c);
```


# 注意点

- BigInt不能用于 [Math] 对象中的方法；不能和任何 [Number] 实例混合运算，两者必须转换成同一种类型。

- 在两种类型来回转换时要小心，因为 BigInt 变量在转换成 [Number] 变量时可能会丢失精度。


## 类型转换

```javascript
BigInt() // 转换普通数值为BigInt类型
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
```

BigInt.parseInt()：近似于Number.parseInt()，将一个字符串转换成指定进制的BigInt类型