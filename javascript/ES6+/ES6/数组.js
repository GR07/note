/**
 * Array.of() 创建数组
 */


// ES5创建数组 传参数字时 会变成长度为2的数组
const a = new Array(2)
const b = new Array("2")
console.log(a, b) //[undefined, undefined] ["2"]

// 所以ES6新增了Array.of()
const c = Array.of(2)
const d = Array.of("2")
console.log(c, d) // [2] ["2"]





/**
 * Array.from() 类数组转数组
 * 
 * 三个参数： 需要转换的类数组、转换完成后每项执行一个函数、this指向
 */

// 
function test(a, b) {
  let arr = Array.from(arguments, value => value + 2)
  console.log(arr)
}
test(1, 2) //[3, 4]





/**
 * 数组新增方法：find()、findIndex()、fill()、copyWithin()。
 */

// find()：传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索。
const arr = [1, "2", 3, 3, "2"]
console.log(arr.find(n => typeof n === "number")) // 1

// findIndex()：返回它的下标。
const arr = [1, "2", 3, 3, "2"]
console.log(arr.findIndex(n => typeof n === "number")) // 0

// fill()：用新元素替换掉数组内的元素，可以指定替换下标范围。
arr.fill(value, start, end) // 三个参数
const arr = [1, 2, 3]
console.log(arr.fill(4)) // [4, 4, 4] 不指定开始和结束，全部替换

// copyWithin()：选择数组的某个下标，从该位置开始复制数组元素，默认从0开始复制。也可以指定要复制的元素范围。
arr.copyWithin(target, start, end) // 参数
const arr = [1, 2, 3, 4, 5]
console.log(arr.copyWithin(3)) // [1,2,3,1,2] 从下标为3的元素开始，复制数组，所以4, 5被替换成1, 2