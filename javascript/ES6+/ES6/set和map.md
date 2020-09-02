

Map是存储许多键值对的有序列表，key和value支持所有数据类型。

Set很像数组，特点：没有key，没有下标，有size和原型，是可迭代的不重复元素的类数组



Set：

两种方式初始化 
```javascript
// 1.提供一个 Array
let set = new Set([1, 3, 5, 'asdasd']); // {1, 3, 5, "asdasd"} 

// 2.直接创建一个空 Set
let set = new Set(); // {}
```

Set方法：
```javascript
let set = new Set([1, 3, 5])
// 尾部添加一个元素。返回该Set对象
set.add('haha'); // {1, 3, 5, "haha"}

// Set中是否存在
set.has('haha') // true

// 返回Set对象的值的个数 
set.size // 4

// 返回 按插入顺序排序的 所有元素的值的 [value, value] 数组
set.entries() // [{key: 1, value: 1}, {key: 3, value: 3} {key: "haha", value: "haha"}]

```

迭代：
```javascript
// 注意！！！不可以使用 for in 迭代，因为for in 遍历对象的key，Set中元素没有key。
for(let i in set) {
  console.log(i); // 不存在
}

// 可以使用for of 循环 (如果需要key)
for(let [key, value] of set.entries()) {
  console.log(value, key);
}

// 只能使用 forEach 处理每个值，因为set元素没有key， 所以 key === value
set.forEach((value, key) => {
  console.log(Object.is(value, key)); // true true
}); 

```

Set与数组交互：
```javascript
// 数组转 Set
const arr = [1, 2, 2, '3', '3']
let set = new Set(arr); // {1, 2, "3"}

// Set转换成数组
Array.from(set) // [1 ,2, "3"]
[...set] // [1 ,2, "3"]

// 数组去重只能是以下三种类型 srting/number/null

```





Map是存储键值对的有序列表，key和value支持所有数据类型。

map 和 Object 区别：

Object：

1.是键值对的集合（Hash 结构）只能用 字符串、Symbol 当作 key。

2.如果不是字符串，则会隐式转换成字符串类型。

3.es6以后如果key是通过隐式转换成字符串，会造成乱序，如没有隐式转换，会按照插入顺序排列。

4.即使是一个空对象 {}，也会存在内部逻辑


Map：

1.key 可以是任意类型any。

2.内部排序按照插入的顺序。

3.添加同样的 key 后面的会把前面的覆盖

4.不存在原型链构造函数constructor，更纯粹的键值对结构，少了内部逻辑，性能更好。


Map 对比 Set

Set，使用add()添加value，没有key。
Map，使用set()添加键值对


方法
```javascript
let m = new Map(); // 空Map
// 使用 set 添加 键值对
m.set('Adam', 67);
// 获取
m.get('Adam'); // 如果没有 返回undefined
// 是否存在 key
m.has('Adam'); // true
// 删除key
m.delete('Adam');
// 获取长度 成员总数
m.size // 23


// 遍历 同样只能使用 forEach 遍历 key、value
keys()

values()

entries()

forEach()
```

Map与数组交互：
```javascript
// map转数组，比较快速的方法是使用扩展运算符（...）
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

```javascript
// 对象转map，通过Object.entries()
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

var map = new Map();
var weakmap = new WeakMap();

(function IIFE(){
    var k1 = {x: 1};
    var k2 = {y: 2};

    map.set(k1, 'k1');
    weakmap.set(k2, 'k2');
})()

map.forEach((val, key) => console.log(key, val))
// Weakmap. forEach(...) ERROR!