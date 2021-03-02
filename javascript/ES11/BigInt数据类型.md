# ES2020 引入了新的数据类型 BigInt，解决大整数计算失精问题。


## 精度丢失问题
```javascript
// js超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示 返回 Infinity
Math.pow(2, 1024) // Infinity
```

## 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

```javascript
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
```


## 数据类型

```javascript
// BigInt与普通整数是两种值，它们之间并不相等
42n === 42 // false

42n == 42 // true

typeof 123n // 'bigint'

BigInt(10) + 10n;    // → 20n
// or
10 + Number(10n);    // → 20
```


## 类型转换

```javascript
BigInt() // 转换普通数值为BigInt类型
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
```

BigInt.parseInt()：近似于Number.parseInt()，将一个字符串转换成指定进制的BigInt类型