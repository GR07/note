
/**
 * Boolean
 */
let isDone: boolean = false;



/**
 * Number
 * 
 * 支持 整数、小数、NaN（not a number）
 */
let decLiteral: number = 6;



/**
 * String
 * 
 * 单引号或双引号或模板字符串
 */
let myName1: string = 'Tom';
let myName2: string = `Tom`;




/**
 * void 表示没有任何类型。 void 只能将它赋值为 undefined 和 null。
 * 
 * 常用于函数没有返回值。
 */
function alertName(): void {
  alert('My name is Tom');
}
let unusable: void = undefined;





/**
 * never类型: 是其他类型的子类型，代表从不会出现的值，
 * 意味着声明never类型的变量只能被never类型所赋值。
 */

// 代表从不会出现的值，比如赋值一个自执行函数。（一般用不上，可以 any 替代）
let b: never;
b = (() => {
  throw new Error('错误');
})()




/**
 * null、undefined 是所有数据类型的子类型，也就是赋值给所有的类型都可以。
 * 
 * 常用于：比如在vue中初始化变量和常量，只知道类型不知道具体值的时候。
 * 
 * 但：
 * undefined 只能被赋值为 undefined
 * null 只能被赋值为 null
 */
let u: undefined = undefined;
let n: null = null;



/**
 * Any 允许被赋值为任意类型。
 * 
 * 当你不知道是什么类型的时候就给它赋 any
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