/**
 * 代理 Proxy
 * 
 * 注意这个 Proxy 和 webpack配置跨域的proxy 不是同一个东西。
 * 
 * 可以理解成拦截某个东西，然后执行某个函数操作，再返回函数操作的结果。
 */


 /**
  * 语法：
  * 
  * 两个参数：
  * 
  * target：一个目标对象(可以是任何类型的对象，包括本机数组，函数，甚至另一个代理)用Proxy来包装。
  * 
  * handler：一个对象，其属性get是当执行一个操作时定义代理的行为的函数。
  */

// 这个例子的作用是拦截目标对象obj，当执行obj的读写操作时，进入handler函数进行判断，如果读取的key不存在，则返回默认值。
let p = new Proxy(target, handler);

const obj = {
    a: 10
}
let handler = {
    get: function(target, name){
        console.log('test: ', target, name)
        // test:  {"a":10} a
        // test:  {"a":10} b
        return name in target ? target[name] : 37
    }
}
let p = new Proxy(obj, handler)
console.log(p.a, p.b) // 10 37