/**
 * 接口（Interfaces）定义规则标准。
 *
 * 我的理解：新创建的对象必须以接口的规则来定义，是抽象类的升级版。
 */


/**
 * interface
 */
// 定义一个FullName接口
interface FullName {
  firstName: string;
  lastName: string;
}
// 接口规定必须传入一个对象：{firstName: string; lastName: string}
function printName (name: FullName) {
  console.log(`${name.firstName}${name.lastName}`)
}
const obj = {
  firstName: '张',
  lastName: '三',
  age: 18
}
// 建议这种写法，这种写法只要对象里包含接口定义的两个属性就可以
printName(obj)
// 这种写法必须只有接口定义的两个属性
printName({firstName: '张', lastName: '三'})




/**
 * 接口 在函数中的应用
 */
interface SearchFunc {
  (a: string, b: string): string;
}
// 使用
let mySearch: SearchFunc = function(a: string, b: string): string {
  return a + b;
};
// 上面的简写形式
let mySearch2: SearchFunc = function(a, b) {
  return a + b;
};



/**
 * a 的形状必须和接口 Person 一致。
 * 属性数量也必须一致
 */

// 对象（不常用）
interface PerObj {
  [index: string]: string;
}
let a: PerObj = {
  name: 'Tom'
};

// 数组（不常用）
interface PerArr {
  [index: number]: string;
}
let cd: PerArr = ['a', 'b', 'c']
console.log(cd)




/**
 * 可选属性 该属性可以不存在，和可传参数一样。
 */
interface Optional {
  name: string;
  age?: number;
}
let b: Optional = {
  name: 'jim'
};



/**
 * 任意属性 除了接口定义的属性外，允许增加任意的属性
 * 注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 */
interface AtWill {
  name: string;
  [propName: string]: any; // name的类型必须是 any 的子集
}
let c: AtWill = {
  name: 'Tom',
  gender: 'male'
};


