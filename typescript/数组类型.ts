/**
 * 基本用法：「类型 + 方括号」表示法
 */
// 数组的项中不允许出现其他的类型
let a: number[] = [1, 1, 2, 3, 5];
// 数组一些方法的参数也会限制
a.push(8);


/**
 * 数组泛型
 */
let b: Array<number> = [1, 1, 2, 3, 5];



/**
 * 接口 在数组中的应用
 */
interface NumberArray {
  [index: number]: number;
}
let c: NumberArray = [1, 1, 2, 3, 5];



/**
 * any 在数组中的应用
 */
// 项可以是任意类型
let d: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];



/**
 * IArguments 类数组
 */
function sum() {
  let args: IArguments = arguments;
}