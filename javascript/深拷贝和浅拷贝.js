

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




/**
 * JSON.stringify 详细说明
 */



 /**
  * 特性：
  * 
  * 1.传参为对象时，遇到 function / undefined / symbol 会被跳过。
  * 
  * 2.传参为数组时，遇到 function / undefined / symbol 会转换为 null。
  * 
  * 3.传参为单个值时，遇到 function / undefined / symbol 会转换为 undefined。
  * 
  * 4.传参为对象时，如果其中一个属性为toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
  * 
  * 5.对象中存在 fn / undefined / symbol 属性因为会被跳过，所以跟在后面的属性位置会变。
  * 
  * 6.遇到 new Date对象，会被正常序列化为字符串 JSON.stringify({ now: new Date() }) 这是因为，new Data 内部有 toJSON()方法。
  * 
  * 7.NaN 和 Infinity 格式的数值及 null 都会被当做 null
  * 
  * 8.在深拷贝时，如果存在循环引用，会抛出错误
  */



    // 处理数据属性转换 把_id 改成 id，把updated_at 改成updatedAt，把 created_at 改成 createdAt。
    const todayILearn = {
      _id: 1,
      content: '今天学习 JSON.stringify()，我很开心！',
      created_at: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
      updated_at: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
  }

  const todayILearn = {
      id: 1,
      content: '今天学习 JSON.stringify()，我很开心！',
      createdAt: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
      updatedAt: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
  }

  // 方案一：遍历 一次遍历+多声明一个变量
  const todayILearnTemp = {};
  for (const [key, value] of Object.entries(todayILearn)) {
      if (key === "_id") todayILearnTemp["id"] = value;
      else if (key === "created_at") todayILearnTemp["createdAt"] = value;
      else if (key === "updatedAt") todayILearnTemp["updatedAt"] = value;
      else todayILearnTemp[key] = value;
  }
  console.log(todayILearnTemp);

  // 方案二：delete 删除
  todayILearn.id = todayILearn._id;
  todayILearn.createdAt = todayILearn.created_at;
  todayILearn.updatedAt = todayILearn.updated_at;
  delete todayILearn._id;
  delete todayILearn.created_at;
  delete todayILearn.updated_at;
  console.log(todayILearn);

  // 方案三：JSON + replace
  const mapObj = {
      _id: "id",
      created_at: "createdAt",
      updated_at: "updatedAt"
  };
  JSON.parse(JSON.stringify(todayILearn).replace(/_id|created_at|updated_at/gi, matched => mapObj[matched]))

  // {
  // id: 1,
  //  content: '今天学习 JSON.stringify()，我很开心！',
  //  createdAt: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
  //  updatedAt: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
  // }




// 1.传参为对象时，遇到 function / undefined / symbol 会被跳过。
let a = JSON.stringify({
    func: function () {},
    ud: undefined,
    syb: symbol("asd")
})
console.log(a) // {}


// 2.传参为数组时，遇到 function / undefined / symbol 会转换为 null。
let b = JSON.stringify([function () {}, undefined, symbol("asd")])
console.log(b) // [null, null, null]


// 3.传参为单个值时，遇到 function / undefined / symbol 会转换为 undefined。
let func = JSON.stringify(function () {})
let unde = JSON.stringify(undefined)
let symb = JSON.stringify(symbol("asd"))
console.log(func) // undefined
console.log(unde) // undefined
console.log(symbol) // undefined


// 4.传参为对象时，如果其中一个属性为toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
  var obj = {
      foo: 'foo',
      toJSON: function () {
          return 'bar';
      }
  };
  JSON.stringify(obj);      // '"bar"'
  JSON.stringify({x: obj}); // '{"x":"bar"}'



// 5.对象中存在 fn / undefined / symbol 属性因为会被跳过，所以跟在后面的属性位置会变。
  


// 6.遇到 new Data对象，会被正常序列化为字符串 JSON.stringify({ now: new Date() }) 这是因为，new Data 内部有 toJSON()方法。
let newDate = JSON.stringify({ key: new Date() })
console.log(newDate) // "{"key":"2020-09-17T11:50:17.484Z"}"



// 7.NaN 和 Infinity 格式的数值及 null 都会被当做 null
let nu = JSON.stringify(NaN); // null
let nu = JSON.stringify(Infinity); // null
let nu = JSON.stringify(null); // null


// 8.布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
let bz = JSON.stringify([new Number(1), new String("true"), new Boolean(true)])
console.log(bz) // [1, "true", true]


// 9.在深拷贝时，如果存在循环引用，会抛出错误
const obj = { name: "guor" }
const loopObj = { obj }
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
deepClone(obj)


/**
 * 第二个参数 replacer
 * 
 * 可以是一个函数 或 数组
 * 
 */

 // 如果是函数：可以有两个参数 key val 类似于数组的 map 方法的回调，对每个属性执行一次函数
  const data = {
      a: "aaa",
      b: undefined,
      c: Symbol("dd"),
      fn: function() {
          return true;
      }
  };
  JSON.stringify(data) // { a: "aaa" }

  JSON.stringify(data, (key, val) => {
      if (typeof val === "function") {
          return val.toString()
      }
      if (typeof val === "undefined") {
          return "undefined"
      }
      if (typeof val === "symbol") {
          return val.toString()
      }
      return val
  }) // "{ a: "aaa", b: "undefined", c: Symbol("dd"), fn: "function() { return true }" }"


  // 如果是数组：数组中的项就是对象中指定需要序列化的属性名
  JSON.stringify({ name: 18, age: 'guor'}, ['name']) // "{ name: 18 }"


  /**
   * 第三个参数 space
   * 
   * 数值（加空格，上限为10） / 字符串（加字符串，取其前10个字母）
   * 
   * 只是用来美化格式化后的字符串
   */
