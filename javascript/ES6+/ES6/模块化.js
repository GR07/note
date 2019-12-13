/**
 * ES5不支持原生的模块化，在ES6中通过 import、export 连接模块。
 */

  // 导出(export)
  export const name = 'Rainbow'

  export function myModule(someArg) {
    return someArg;
  }



  // 导入(import)
  import { myModule } from 'myModule'; // main.js
  import { name, age } from 'test'; // test.js



  // 一条import 语句可以同时导入默认函数和其它变量。
  import defaultMethod, { otherMethod } from 'xxx.js';