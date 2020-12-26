

/**
 * 赋值 / 浅拷贝 / 深拷贝 区别 
 * 
 * 三者针对引用类型的比较
 */


/**
 * 赋值：
 * 0.指向相同的对象
 * 1.赋的是在栈中的地址，而不是堆中的数据。
 * 2.两个对象指向同一个存储空间。
 * 3.对象第一层的属性是基本类型会相互影响。
 * 4.对象第一层的属性是引用类型会相互影响。
 */
let obj1 = {
  name : '浪里行舟',
  arr : [1,[2,3],4],
};
let obj2 = obj1;
obj2.name = "阿浪";
obj2.arr[1] =[5,6,7] ;
console.log('obj1',obj1) // obj1 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj2',obj2) // obj2 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }


/**
 * 浅拷贝：
 * 0.指向不同的对象
 * 1.在堆中创建内存，指向同一个内存地址，共享同一块内存。
 * 2.对象属性的基本数据类型互不影响。
 * 3.对象第一层的属性是引用类型会相互影响。
 * 4.对象属性的引用类型 严格相等。
 */

const a1 = { 
  b: { c: { d: 1 } }
}
const b1 = Object.assign({}, a1) // b1.b.c === a1.b.c true
const b1 = JSON.parse(JSON.stringify(a1)) // b1.b.c === a1.b.c false


/**
 * 深拷贝：
 * 0.指向不同的对象
 * 1.在堆内存中 '开辟一个新的区域' 存放新对象，不共享内存。
 * 2.对对象中的子对象进行递归拷贝。
 * 3.拷贝前后的两个对象互不影响。
 */






/**
 * 浅拷贝的实现方式：
 */

/**
 * Object.assign()
 * 1.把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
 */


/**
 * 展开运算符...
 * 与 Object.assign ()的功能相同。
 */

let obj1 = { name: 'Kobe', address:{x:100,y:100}}
let obj2= {... obj1}
obj1.address.x = 200;
obj1.name = 'wade'
console.log(obj2) // { name: 'Kobe', address: { x: 200, y: 100 } }


/**
 * Array.prototype.concat()
 * 适用于基础类型一维数组的深拷贝。
 */

let arr = [1, 3, { username: 'kobe' }];
let arr2 = arr.concat();    
arr2[2].username = 'wade';
console.log(arr); // [ 1, 3, { username: 'wade' } ]


/**
 * Array.prototype.slice()
 * 适用于基础类型一维数组的深拷贝。
 */

let arr = [1, 3, { username: ' kobe' }];
let arr3 = arr.slice();
arr3[2].username = 'wade'
console.log(arr); // [ 1, 3, { username: 'wade' } ]







/**
 * 深拷贝的实现方式：
 */


/**
 * JSON.parse(JSON.stringify())
 * 原理转为字符串 再转为对象就 ok 
 * 此方法不适用含有 undefined、function、正则、symbol、 的属性
 * 
 * 得到的正则（变为空对象），得到的函数（变为null）
 */


/**
  * 递归深拷贝：
  * 原理就是一层一层去遍历对象、数组，直到里边都是基本数据类型，然后再去复制。
  * 如果对象过深，会有爆栈风险。
  */


/**
 * 有种特殊情况需注意就是对象存在循环引用的情况，即对象的属性直接的引用了自身的情况，
 * 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
 * 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 */
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; 
  // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);