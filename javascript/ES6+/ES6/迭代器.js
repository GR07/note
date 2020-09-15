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
  const a = createIterator();
  for(let value of a) {
    console.log(value)
  }
  // 1 2 3

