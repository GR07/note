/**
 * 对函数的输入（传值）和输出（返回值）进行约束
 */



/**
 * ts中的 函数声明
 */
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2); // 参数的数量也必须一致




/**
 * ts中的 函数表达式：分为左边约束、右边约束，两个部分。
 */
// mySum: (x: number, y: number) => number 表示函数类型并约束输入参数的类型，和输出类型
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};




/**
 * 没有返回值：void
 */
function ab (): void {
  console.log(123)
}




/**
 * 可选参数： 与接口的可选属性类似，但位置必须是最后一个参数
 */
// 参数 b 可传可不传
function buildName(a: string, b?: string) {
  if (b) {
    return a + ' ' + b;
  } else {
    return a;
  }
}




/**
 * 参数默认值： es5没有  es6和ts都可以设置。
 * 会将添加了默认值的参数识别为可选参数
 */
function defaultName(a: string, b: string = 'Cat') {
  return a + ' ' + b;
}
let jimcat = defaultName('Jim', 'Cat');
let jim = defaultName('Jim');





/**
 * 剩余参数： ...rest 获取函数中的剩余参数
 */
// 其实 ...item 表示剩余参数的数组
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);




/**
 * 重载：函数接受不同数量或类型的参数时，作出不同的处理。
 */
// 要优先把精确的定义写在前面。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}



/**
 * 
 * 类型断言有两种形式：“尖括号”语法、as语法
 */

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;


let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;


function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}



