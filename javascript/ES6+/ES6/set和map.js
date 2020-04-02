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







// Map像是对象，对象中的key只支持字符串，Map更加强大，支持所有数据类型。


// Map初始化传入一个二维数组
let m = new Map([['guor', 28]]); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
console.log(m)

// 多次对一个key放入value，后面的值会把前面的值冲掉