// Set像是数组，Set集合的特点是没有key，没有下标，只有size和原型以及一个可迭代的不重复元素的类数组。

let set = new Set();
set.add('haha');
console.log(set.size); //1

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


// Map使用set()添加key value，在Set集合中，使用add()添加value，没有key。
let map = new Map();
map.set('name', 'haha');
map.set('id', 10);
console.log(map)
console.log(map.get('id')) // 10
console.log(map.get('name')) // "haha"