/**
 * 模块的定义:
 * 
 * 模块是自动运行在严格模式下并且没有办法退出运行的JavaScript代码。
 * 
 * 模块可以是函数、数据、类，需要指定导出的模块名，才能被其他模块访问。
 */

 //数据模块
 const obj = {a: 1}
 //函数模块
 const sum = (a, b) => {
   return a + b
 }
 //类模块
 class My extends React.Components {
 
 }




 /**
  * 模块的导出:
  * 
  * 给数据、函数、类添加一个export，就能导出模块。
  */

  //数据模块
  export const obj = {a: 1}
  //函数模块
  export const sum = (a, b) => {
    return a + b
  }




  /**
   * 模块的引用:
   * 
   * 使用import关键字，导入分2种情况，一种是导入指定的模块，另外一种是导入全部模块。
   */

   // 1、导入指定的模块。
   import {obj, My} from './xx.js'
    
   //使用
   console.log(obj, My)


   // 2、导入全部模块
   import * as all from './xx.js'
    
   //使用
   console.log(all.obj, all.sun(1, 2), all.My)




   /**
    * 默认模块:
    * 
    * 给模块加上default关键字，那么该js文件默认只导出该模块，还需要把大括号去掉。
    */

    //默认模块的定义
    function sum(a, b) {
        return a + b
    }
    export default sum
    
    //导入默认模块
    import sum from './xx.js'


    /**
     * 模块的使用限制:
     * 
     * 不能在语句和函数之内使用export关键字，只能在模块顶部使用
     */


     /**
      * 修改模块导入和导出名:
      * 
      * 有2种方式，一种是模块导出时修改，一种是导入模块时修改。
      */


        // 1、导出时修改：
        function sum(a, b) {
            return a + b
        }
        export {sum as add}

        import { add } from './xx.js'
        add(1, 2)


        // 2、导入时修改：
        function sum(a, b) {
            return a + b
        }
        export sum
    
        import { sum as add } from './xx.js'
        add(1, 2)





    /**
     * 无绑定导入:
     * 
     * 当模块没有可导出模块，全都是定义的全局变量的时候，可以使用无绑定导入。
     */

        // 模块：
        let a = 1
        const PI = 3.1314

        // 无绑定导入：
        import './xx.js'
        console.log(a, PI)