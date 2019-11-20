/**
 * 安装：
 * 
 * 1.首先安装 node
 * 
 * 2.全局安装 npm install -g typescript
 * 
 * 3.运行 tsc 文件名.ts 即可
 */


 
/**
 *
 * typescript中的数据类型
 *
 * 布尔类型
 * 数字类型
 * 字符串类型
 * 数组类型
 * 元组类型
 * 枚举类型
 * 任意类型
 * null 和 undefined
 * void类型
 * never类型
 */



/**
 * Boolean
 */
let isDone: boolean = false;



/**
 * Number
 */
let decLiteral: number = 6;



/**
 * String
 */
let myName: string = 'Tom';




/**
 * void 表示没有任何返回值的函数。 void 只能将它赋值为 undefined 和 null。
 */
function alertName(): void {
  alert('My name is Tom');
}
let unusable: void = undefined;





/**
 * never类型: 是其他类型的子类型，代表从不会出现的值，
 * 意味着声明never类型的变量只能被never类型所赋值。
 */
// 只能被never类型所赋值。
let a: undefined;
a = undefined;

// 代表从不会出现的值，比如赋值一个自执行函数。（一般用不上，可以 any 替代）
let b: never;
b = (() => {
  throw new Error('错误');
})()




/**
 * null、undefined 是其他数据类型（never类型）的子类型。
 *
 * undefined 只能被赋值为 undefined
 * null 只能被赋值为 null
 */
let u: undefined = undefined;
let n: null = null;



/**
 * Any 允许被赋值为任意类型。
 * 在任意值上访问任何属性和方法都是允许的
 */
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
let anyThing: any = 'Tom';
anyThing.setName('Jerry');




/**
 * | 联合类型
 * 一个变量可能是 string 可能 number
 */
let myFavorite: string | number;
myFavorite = 'seven';
myFavorite = 7;




/**
 * type 类型别名 用来给一个类型起个新名字
 */
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;



/**
 * type 字符串字面量 约束取值只能是某几个字符串中的一个
 */

type EventNames = 'click' | 'scroll' | 'mousemove';
// event 只能取三种字符串中的一种
function handleEvent(ele: Element, event: EventNames) {
  // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'