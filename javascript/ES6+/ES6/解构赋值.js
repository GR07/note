/**
 * 解构是从对象中提取出更小元素的过程。赋值是对解构出来的元素进行重新赋值。
 */




// 对象解构
let obj = {
  a: 1,
  b: [1, 2]
}
const { a, b } = obj
console.log(a, b) //1  [1, 2]




// 函数中使用
let props = {
  a: 1,
  b: 2
}
function test(value) {
  console.log(value)
}
test({a=3, b=3} = props) // {a: 1, b: 2}





// 数组解构
let arr = [1, 2, 3]

//解构前2个元素
const [a, b] = arr
console.log(a,b) //1 2

//解构中间的元素
const [, b,] = arr
console.log(b) // 2





// 解构赋值，还可以调换2个变量的值
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1 




// 克隆arr数组
let arr = [1, 2, 3, 4];
let [...a] = arr;
console.log(a) //[1,2,3,4] 这种做法就是克隆arr数组。





// 解构参数 常用到
function Ajax(url, options) {
  const {timeout = 0, jsonp = true} = options // 给option的参数设置了默认值 防止没有传参导致的报错
  console.log(url, timeout, jsonp)
};
Ajax('baidu.com', {
  timeout: 1000,
  jsonp: false
}) // "baidu.com" 1000 false