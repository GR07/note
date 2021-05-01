
# 如何选择

如果你需要将数组按照某种规则映射为另一个数组，就应该用 map。

如果你需要进行简单的遍历，用 forEach 或者 for of。

如果你需要对迭代器进行遍历，用 for of。

如果你需要过滤出符合条件的项，用 filterr。

如果你需要先按照规则映射为新数组，再根据条件过滤，那就用一个 map 加一个 filter。



# forEach()

它总是返回 undefined 值，所以不可链式调用。

会跳过未初始化的值。[1, 3, , 1]

item 如果是值类型，原数组不可改变，如果是引用类型则可以改变。

除了抛出异常以外，没有办法中止或跳出 forEach() 循环。

若你需要提前终止循环，你可以使用：

一个简单的 for 循环
for...of / for...in 循环
every()
some()
find()
findIndex()

这些数组方法则可以对数组元素判断，以便确定是否需要继续遍历：

只要条件允许，也可以使用 filter() 提前过滤出需要遍历的部分，再用 forEach() 处理。





# map()

返回一个新数组

会跳过未初始化的值。[1, 3, , 1]

中途不能跳出循环

每一项是调用函数返回的结果

item如果是值类型，原数组不可改变，如果是引用类型则可以改变（map的思想是 不修改原数组返回一个新数组，所以最好不要用map修改原数组。）

当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代。




# filter()

不会改变原数组。

不可以中途跳出。

如果没有任何数组元素通过测试，则返回空数组。

它返回过滤后的新数组。

把返回 true 的值的元素创建一个新数组。




# sort()

直接改变原数组

```js
// 默认排序: 是每一项调用 toString() 比较的结果
[10, 20, 1, 2].sort();  [1, 10, 2, 20]

// 自定义
arr.sort((x, y) => {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
});
[1, 2, 10, 20]
```



# some()

不会改变数组。

如果用一个空数组进行测试，在任何情况下它返回的都是false。

数组只要有一项满足条件即返回 true，之后的不再执行(所以说对性能很友好！)。

当内部 return true 时跳出整个循环，所以可以 return false 跳过当前项。



# every()

不会改变原数组。

若收到一个空数组，此方法在一切情况下都会返回 true。

数组中的每一项都满足条件才会返回 true

当内部 return false 时跳出整个循环，所以可以 return true 跳过当前项。


# find()

不会改变数组。

返回满足条件的第一个元素，否则返回 undefined。

当找到了这样一个元素后，该方法会立即返回这个元素的值


# findIndex()

不会修改所调用的数组。

返回满足条件的第一个元素的索引，否则返回 -1。



# reduce()

callback 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，最后返回累计器。

两个参数

+ callback 函数。四个参数（累计器、当前值、当前索引、源数组）

+ initialValue 可选，作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。


## 注意 提供初始值通常更安全

回调函数第一次执行时，累计器 和 当前值 的取值有两种情况：

+ 如果调用 reduce() 时提供了 第二个参数，累计器 取值为 第二个参数，当前值 取数组中的第一个值。

+ 如果没有提供 第二个参数，那么 累计器 取数组中的第一个值，当前值 取数组中的第二个值。


如果没有提供 第二个参数，reduce 会从索引1的地方开始执行 callback，跳过第一个索引。

如果提供 第二个参数，从索引0开始。


```js
// 二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
```

```js
// 计算数组中每个元素出现的次数
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

```js
// 按属性对object分类
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

```js
// 数组去重
let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue)
  }
  return accumulator
}, [])

console.log(myOrderedArray)


let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
let result = arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length-1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]
```