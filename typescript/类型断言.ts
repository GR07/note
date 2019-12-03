/**
 * 
 * 类型断言有两种写法：“尖括号”语法、as语法。
 * 
 * 跳过ts的类型检查，告诉程序 我比你清楚 变量或函数 返回的 是什么类型。
 * 
 * 建议使用as语法，react中只支持as
 */

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;


let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

