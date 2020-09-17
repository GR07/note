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
 function *createIterator() {
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
 function *createIterator(items) {
    for(let i = 0; i < items.length;  i++) {
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
   */

  function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const a = createIterator(); // 这是一个 __proto__: Generator
  for(let value of a) {
    console.log(value)
  }
  // 1 2 3



  /**
   * Symbol.iterator
   * 
   * 访问迭代器
   */
  function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
  const a = createIterator(); // a是一个迭代器
  const s = a[Symbol.iterator]();// 使用Symbol.iterator访问迭代器
  console.log(s.next()) // {value: 1, done: false}


  // Symbol.iterator还可以用来检测一个对象是否可迭代：
  typeof obj[Symbol.iterator] === "function"



  /**
   * 创建可迭代对象
   * 
   * 在ES6中，数组、Set、Map、字符串都是可迭代对象。
   * 
   * 对象（object）是不可迭代的，但是可以通过Symbol.iterator创建迭代器。
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