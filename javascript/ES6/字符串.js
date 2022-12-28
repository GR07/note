/**
 * 字符串中的子串识别：
 * 
 * ES6新增三种方法：
 * 
 * 
 */

// includes(str, index)：在字符串中检测文本，返回布尔值。
let t = 'abcdefg'
if(t.includes('cde')) {
  console.log(2)
} // true



// startsWith(str, index)：从字符串起始部分检测文本，返回布尔值。
let t = 'abcdefg'
if(t.startsWith('ab')) {
  console.log(2)
} // true



// endsWith(str, index)：从字符串结束部分检测文本，返回布尔值。
let t = 'abcdefg'
if(t.endsWith('fg')) {
  console.log(2)
} // true


// 如果只是想检测是否包含字符串 用 es6方法

// 如果想确认位置 用 indexOf()


// repeat(number) 接收一个Number 返回重复 Number次数的字符串
console.log('ba'.repeat(3)) // bababa


/**
 * 在ES6中通过 ${} 就可以完成字符串的拼接，只需要将变量放在大括号之中。
 * /

// 不使用模板字符串
let name = 'Your name is ' + first + ' ' + last + '.'

// 使用模板字符串
let name = `Your name is ${first} ${last}.`