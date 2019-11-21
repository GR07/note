/**
 * 定义数组类型有 4 种 ：
 *
 * 数组的项中不允许出现其他的类型，数组一些方法的参数也会限制。
 */
// 第一种
let a: number[] = [1, 1, 2, 3, 5];
a.push(8);
// 第二种 也叫数组泛型
let b: Array<number> = [1, 1, 2, 3, 5];
// 第三种
let c: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];

// 构造函数赋值
let f: number[] = new Array(1, 2, 3)





/**
 * 接口 在数组中的应用
 */
interface NumberArray {
  [index: number]: number;
}
let d: NumberArray = [1, 1, 2, 3, 5];





/**
 * any 在数组中的应用
 */
// 项可以是任意类型
let e: any[] = ['Xcat Liu', 25, { website: 'http://xcatliu.com' }];



/**
 * IArguments 类数组
 */
function sum() {
  let args: IArguments = arguments;
}