/**
 * 可以方便的从 数组 或者 对象 中快速提取值赋给定义的变量。
 */


// 获取数组中的值

let foo = ["one", "two", "three", "four"];
// 变量的顺序与数组中对象顺序对应
let [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"


//如果你要忽略某些值，你可以按照下面的写法获取你想要的值
let [first, , , last] = foo;
console.log(first); // "one"
console.log(last); // "four"


//你也可以这样写
let a, b; //先声明变量

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2


// 也可以为变量设置一个默认值
let a, b;

[a = 5, b = 7] = [1];
console.log(a); // 1
console.log(b); // 7


// 通过解构赋值可以方便的交换两个变量的值。
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1







// 获取对象中的值
const student = {
  name:'Ming',
  age:'18',
  city:'Shanghai'  
};

const {name, age, city} = student;
console.log(name); // "Ming"
console.log(age); // "18"
console.log(city); // "Shanghai"
