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


// 让程序去判断是什么类型
let n1 = 200
n1 = 'asd' // 会报错 提示只能式 number 类型

