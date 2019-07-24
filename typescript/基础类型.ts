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
 * void 表示没有任何返回值的函数, 只能将它赋值为 undefined 和 null
 */
function alertName(): void {
  alert('My name is Tom');
}
let unusable: void = undefined;



/**
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
 */
let myFavorite: string | number;
myFavorite = 'seven';
myFavorite = 7;



/**
 * type 类型别名
 */
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;



/**
 * type 字符串字面量
 */

type EventNames = 'click' | 'scroll' | 'mousemove';
// event 只能取三种字符串中的一种
function handleEvent(ele: Element, event: EventNames) {
  // do something
}
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'