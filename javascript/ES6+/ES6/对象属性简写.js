/**
 * ES6中允许我们在设置一个对象的属性的时候不指定属性名。
 */


const name='guor', age='18', city='cc';

// 不使用ES6 
const student = {
  name: name,
  age: age,
  city: city
};

// 使用ES6
const student = {
  name,
  age,
  city
};

