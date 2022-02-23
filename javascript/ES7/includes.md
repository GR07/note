# includes()
 
- 用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。

- 区分大小写

- 支持第二个参数 索引开始

- 只能判断简单类型的数据

- 能识别NaN，indexOf是不能识别NaN的




```js
// 支持第二个参数
// 从fromIndex 索引处开始查找 valueToFind。如果为负值（即从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7')) // true
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes("es7", -1)); // fsle
console.log(arr.includes("es7", -2)); // true
```


```js
// 在ES7之前的做法

let arr = ['react', 'angular', 'vue'];
// 使用indexOf()根据返回值是否为-1来判断
if (arr.indexOf('react') !== -1) {
  console.log('react存在');
}

```