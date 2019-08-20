/**
 * ECMAScript 标准提供的内置对象: 可以直接作为定义类型
 * Boolean、Error、Date、RegExp 等。
 */
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;




/**
 * DOM 和 BOM 的内置对象
 *
 * Document、HTMLElement、Event、NodeList 等。
 */
// TypeScript 中会经常用到这些类型
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
