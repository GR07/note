ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

```javascript
// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示 返回 Infinity
Math.pow(2, 1024) // Infinity
```

为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

```javascript
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
```


注意：

```javascript
// BigInt与普通整数是两种值，它们之间并不相等
42n === 42 // false

// typeof运算符对于BigInt类型的数据返回bigint
typeof 123n // 'bigint'
```


方法：

```javascript
BigInt() // 转换普通数值为BigInt类型
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
```

BigInt.parseInt()：近似于Number.parseInt()，将一个字符串转换成指定进制的BigInt类型