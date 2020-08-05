/**
 * Set集合可以用来过滤数组中重复的元素，只能通过has方法检测指定的值是否存在，或者是通过forEach处理每个值。
 * 
 * Map集合通过set()添加键值对，通过get()获取键值，把它看作更强大的对象。
 */



// Set 是一组 key 的集合，但不存储 value 由于 key 不能重复，所以，在 Set 中，没有重复的 key 

// 初始化 set 需要提供一个 Array 作为输入，或者直接创建一个空 Set：
let set = new Set();
set.add('haha');
console.log(set.size); // 1

Set.prototype.size
// 返回Set对象的值的个数。

Set.prototype.add(value)
// 在Set对象尾部添加一个元素。返回该Set对象。

Set.prototype.entries()
// 返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似， 每个值的键和值相等。

Set.prototype.forEach(callbackFn[, thisArg])
// 按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数。

Set.prototype.has(value)
// 返回一个布尔值，表示该值在Set中存在与否



// 可以使用for of 循环
//如果你需要key，则使用下面这种方法
for(let [key, value] of sets.entries()) {
  console.log(value, key);
} 



// 数组转换成Set
const arr = [1, 2, 2, '3', '3']
let set = new Set(arr);
console.log(set) // Set(3) {1, 2, "3"}

// Set转换成数组
let set = new Set();
set.add(1);
set.add('2');
console.log(Array.from(set)) // (2) [1, "2"]

// 数组去重
const arr = [1, 1, 'haha', 'haha', null, null]
let set = new Set(arr);
console.log(Array.from(set)) // [1, 'haha', null]
console.log([...set]) // [1, 'haha', null]







Map像是对象，对象中的key只支持字符串，Map更加强大，支持所有数据类型。


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

```javascript
let m = new Map(); // 空Map
// 添加
m.set('Adam', 67);
// 获取
m.get('Adam'); // 如果没有 返回undefined
// 是否存在 key
m.has('Adam'); // true
// 删除key
m.delete('Adam');

```