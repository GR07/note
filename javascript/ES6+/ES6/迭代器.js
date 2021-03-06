/**
 * 迭代器是什么
 * 
 * 迭代器是一种特殊对象，每一个迭代器对象都有一个next()，next方法返回一个对象，包括value和done属性。
 */

// es5 实现迭代器 !注意该函数不是迭代器，next 返回的结果对象才叫做迭代器!
function create(arr) {
  let i = 0
  return {
    next() {
      let done = (i >= arr.length)
      let value = !done ? arr[i++] : undefined
      return {
        done,
        value
      }
    }
  }
}
const a = create([1, 2, 3])
// next 方法返回的最终是一个对象，包含value、done属性。
console.log(a.next()); // {value: 1, done: false}
console.log(a.next()); // {value: 2, done: false}
console.log(a.next()); // {value: 3, done: false}
console.log(a.next()); // {value: undefined, done: true}




/**
 * 生成器（Generator）
 * 
 * 生成器是函数，用来返回迭代器。
 * 
 * 有2个关键点：一个是函数、一个是返回迭代器。
 * 
 * 函数不是上面ES5中创建迭代器的函数，而是ES6中特有的，一个带有*（星号）的函数，同时也需要使用到yield。
 */

// 使用 效果和上面 es5 一样
function* createIterator() {
  yield 1
  yield 2
  yield 3
}
const a = createIterator()

console.log(a.next()); // {value: 1, done: false}
console.log(a.next()); // {value: 2, done: false}
console.log(a.next()); // {value: 3, done: false}
console.log(a.next()); // {value: undefined, done: true}

// 生成器的yield关键字有个神奇的功能，
// 就是当你执行一次next()，那么只会执行一个yield后面的内容，然后语句终止运行。


// 即使for循环中调用也会暂停循环
function* createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i]
  }
}
const a = createIterator([1, 2, 3]);
console.log(a.next()); // {value: 1, done: false}


// yield 只可以在生成器内部使用


// 在对象中添加生成器函数
const obj = {
  a: 1,
  *createIterator() {
    yield this.a
  }
}
const a = obj.createIterator();
console.log(a.next());  // {value: 1, done: false}


/**
 * 可迭代对象
 * 
 * 凡是通过生成器生成的迭代器，都是可以迭代的对象，也就是可以通过for of将value遍历出来。
 * 
 * 可迭代对象具有Symbol.iterator属性
 */

function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
const a = createIterator(); // 这是一个 __proto__: Generator
for (let value of a) {
  console.log(value)
}
// 1 2 3



/**
 * Symbol.iterator
 * 
 * 可以访问迭代器
 */
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
const a = createIterator(); // a是一个迭代器
const s = a[Symbol.iterator]();// 使用Symbol.iterator访问迭代器

Object.is(a, s) // true

console.log(s.next()) // {value: 1, done: false}


// Symbol.iterator还可以用来检测一个对象是否可迭代：
typeof obj[Symbol.iterator] === "function"



/**
 * 创建可迭代对象
 * 
 * 在ES6中，数组、Set、Map、字符串都是可迭代对象。
 * 
 * 对象（object）默认是不可迭代的，但是可以通过Symbol.iterator创建迭代器。
 */

const obj = {
  items: []
}
obj.items.push(1); // 这样子虽然向数组添加了新元素，但是obj不可迭代
for (let x of obj) {
  console.log(x) // _iterator[Symbol.iterator] is not a function
}

// 给obj添加一个生成器，使obj成为一个可以迭代的对象。
const obj = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
}
obj.items.push(1)
//现在可以通过for of迭代obj了。
for (let x of obj) {
  console.log(x)
}


// 数组、Set、Map都是可迭代对象，是它们内部实现了迭代器，并且提供了3种迭代器函数调用
// entries() values() keys()
// 不同集合的类型还有自己默认的迭代器，
// 在for of中，数组和Set的默认迭代器是values()，Map的默认迭代器是entries()。​


/**
 * 1、entries() 返回迭代器：返回键值对
 */

//数组
const arr = ['a', 'b', 'c'];
for (let v of arr.entries()) {
  console.log(v)
}
// [0, 'a'] [1, 'b'] [2, 'c']

//Set
const arr = new Set(['a', 'b', 'c']);
for (let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b'] ['c', 'c']

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for (let v of arr.entries()) {
  console.log(v)
}
// ['a', 'a'] ['b', 'b']


/**
 * 2、values() 返回迭代器：返回键值对的value
 */

//数组
const arr = ['a', 'b', 'c'];
for (let v of arr.values()) {
  console.log(v)
}
//'a' 'b' 'c'

//Set
const arr = new Set(['a', 'b', 'c']);
for (let v of arr.values()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for (let v of arr.values()) {
  console.log(v)
}
// 'a' 'b'


/**
 * 3、keys() 返回迭代器：返回键值对的key
 */

//数组
const arr = ['a', 'b', 'c'];
for (let v of arr.keys()) {
  console.log(v)
}
// 0 1 2

//Set
const arr = new Set(['a', 'b', 'c']);
for (let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b' 'c'

//Map
const arr = new Map();
arr.set('a', 'a');
arr.set('b', 'b');
for (let v of arr.keys()) {
  console.log(v)
}
// 'a' 'b'



/**
 * 对象本身不支持迭代，但是我们可以自己添加一个生成器，返回一个key，value的迭代器，然后使用for of循环解构key和value。
 */
const obj = {
  "1": "a",
  "2": "b",
  "3": "c",
  *[Symbol.iterator]() {
    for (let key in obj) {
      yield [key, obj[key]]
    }
  }
}
for (let [key, val] of obj) {
  console.log(key, val);
}





/**
 * 高级迭代器功能
 * 
 * 传参 / 抛出异常 / 生成器返回语句 / 委托生成器
 */



// 1、传参：

// 生成器里面有2个yield，当执行第一个next()的时候，返回value为1，
// 然后给第二个next()传入参数10，传递的参数会替代掉上一个next()的yield返回值

// 例子
function* createIterator() {
  let first = yield 1;
  yield first + 2;
}
let i = createIterator();
console.log(i.next()); // {value: 1, done: false}
console.log(i.next(10)); // {value: 12, done: false}



// 2、在迭代器中抛出错误
function* createIterator() {
  let first = yield 1;
  yield first + 2;
}
let i = createIterator();
console.log(i.next()); // {value: 1, done: false}
console.log(i.throw(new Error('error'))); // error
console.log(i.next()); //不再执行


// 3、生成器返回语句

// 生成器中添加return表示退出操作。
function* createIterator() {
  let first = yield 1;
  return;
  yield first + 2;
}
let i = createIterator();
console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: undefined, done: true}



// 4、嵌套生成器
function* aIterator() {
  yield 1;
}
function* bIterator() {
  yield 2;
}
function* cIterator() {
  yield* aIterator()
  yield* bIterator()
}

let i = cIterator();
console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: 2, done: false}



/**
 * 异步任务执行器：
 * 
 * 任务执行器是一个函数，用来循环执行生成器，
 * 
 * 因为我们知道生成器需要执行N次next()方法，才能运行完，
 * 
 * 所以我们需要一个自动任务执行器帮我们做这些事情，这就是任务执行器的作用。
 */


// 编写一个异步任务执行器。

//taskDef是一个生成器函数，run是异步任务执行器
function run(taskDef) {
  let task = taskDef(); //调用生成器
  let result = task.next(); //执行生成器的第一个next()，返回result
  function step() {
    if (!result.done) {
      //如果done为false，则继续执行next()，并且循环step，直到done为true退出。
      result = task.next(result.value);
      step();
    }
  }
  step(); //开始执行step()
}

// 不再需要console.log N个next了，因为run执行器已经帮我们做了循环执行操作：
run(function* () {
  let value = yield 1;
  value = yield value + 20;
  console.log(value) // 21
})



// 使对象变为可迭代（es5写法）
const obj = {
  a: [1, 2],
  b: [123,324,345],
  [Symbol.iterator]: function () {
      console.log(`Symbol.iterator-------`, this);
      let index = 0;
      const arr = [...this.b, ...this.a];
      return {
          next: function () {
              console.log(`next: function-------`, this);
              let value = arr[index];
              let done = index++ >= arr.length;
              return {
                  value,
                  done
              }
          }
      }
  }
}

// 使对象变为可迭代（es6写法）
const obj = {
  a: [1, 2],
  b: [123,324,345],
  [Symbol.iterator]: function* () {
      for (const item of this.b) {
          yield item;
      }
  }
}

for (const item of obj) {
  console.log(item);
}