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
function printName (name: FullName) {
  // 必须传入一个对象：firstName: string; lastName: string;
  console.log(`${name.firstName}${name.lastName}`)
}
const obj = {
  firstName: '张',
  lastName: '三',
  age: 18
}
// 建议这种写法，但是对象的属性要严格按照接口的定义
printName(obj) // 这样传参只要对象里包含接口定义的两个属性就可以
printName({firstName: '张', lastName: '三'}) // 这样传参必须只有接口定义的两个属性




/**
 * 接口 在函数中的应用
 */
interface SearchFunc {
  (a: string, b: string): string;
}
let mySearch: SearchFunc;
mySearch = function(a: string, b: string) {
  return a + b;
};




/**
 * a 的形状必须和接口 Person 一致。
 * 属性数量也必须一致
 */
// 对象
interface PerObj {
  [index: string]: string;
}
let a: PerObj = {
  name: 'Tom'
};
// 数组
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
 * 任意属性 接口允许有任意的属性
 * 注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 */
interface AtWill {
  name: string;
  [propName: string]: any; // name的类型都必须是 any 的子集
}
let c: AtWill = {
  name: 'Tom',
  gender: 'male'
};



/**
 * 只读属性 只可以在创建对象的时候给这个属性赋值
 */
interface Read {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let d: Read = {
  id: 234,
  name: 'Tom',
  gender: 'male'
};