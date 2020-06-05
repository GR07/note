forEach()

// 常用于对数组自身的改变和各元素相关统计性的计算

// 可以改变数组自身 / 没有返回值 / 中途不能跳出循环

// 注意: 只有 item 是引用类型才可以改变数组, 值类型无效.




map()

// 原数组不会改变 返回一个新数组

// 每一项 item 是调用函数返回的结果

let arr = [1,2,3];
arr = arr.map(item => { return item * 2 })

// 注意: 如果用 map 过滤是不行的
let newArr = [1,2,3,4,5].map(item => { if(item > 3) return item })
// => [undefined, undefined, undefined, 4, 5]



for (let item of arr) {}

// 常用于数组，支持解构。



filter()

// 返回一个新数组

// 每一项 item 是调用函数筛选出来符合条件的结果

let newArr = [1,2,3,4,5].filter(item => {
  if(item > 3) return item 
})
//  => [4,5]




sort()

// 直接改变原数组

// 默认排序:
[10, 20, 1, 2].sort(); // [1, 10, 2, 20]

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
// [1, 2, 10, 20]




some()

// 返回布尔值

// 数组只要有一项满足即返回 true，之后的不再执行(所以说对性能很友好！)。

// 注：当内部 return true 时跳出整个循环

const result = [
  {name:'鸣人',age:16},
  {name:'佐助',age:17}
].some(item => {
 return item.age > 16 
});
// true




every()

// 数组中的每一项只有都满足了才会返回 true
// 注：当内部 return false 时跳出整个循环

const result = [
  {name:'鸣人',age:16},
  {name:'佐助',age:17}
].every(item => {
 return item.age > 16 
});
// false




// 其他常用


// 数组去重

const arr = [...new Set(arr1)]

// 注意: Set() 没法去重元素是引用对象的数组

// 解决方案: Lodash 的 _.uniqWith()
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
_.uniqWith(objects, _.isEqual);
// _.isEqual(value,other)用于执行深比较来确定两者的值是否相等。 _.uniqWith()做去重处理。




// 获取数组中指定元素

find() // 返回第一个匹配到的元素本身
findIndex() // 返回索引

// 虽然 filter() 确实可以做到 但是会从头遍历到尾 出于性能的考虑 find() 可以找到匹配项就终止

let testArr = [{name:'鸣人',age:16},{name:'佐助',age:17},{name:'卡卡西',age:27},{name:'佐助',age:17}]
let result = testArr.find(item => { return item.name == '佐助'});
// => { name:'佐助',age:17 }




includes()

// 返回布尔值表示某个数组是否包含给定的值

// indexOf()它会返回 -1 和元素的位置来表示包含的意思 不够语义化 也不能判断是否包含NaN元素




常用实战:


// 数组对象 转 对象 { CN : "China", US : "USA" }
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})



// 数组转数组对象 [ { "value": "value:Alabama", "label": "label:Alabama" }, { "value": "value:Alaska", "label": "label:Alaska" } ]
const states = ["Alabama", "Alaska"],
this.list = this.states.map(item => {
  return { value: `value:${item}`, label: `label:${item}` };
});



// 合并对象
this.taskList = this.taskList.map(item => {
  return Object.assign({}, item, {'isShowAllImg': false})
})


// 过滤出符合条件的项
const restaurants = [
  { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
  { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
  { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" }]
var results = queryString ? restaurants.filter((restaurant) => {
  return (restaurant.value.toLowerCase().includes(queryString.toLowerCase()))
}) : restaurants;