/**
 * includes() 用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false。
 */


// 在ES7之前的做法

let arr = ['react', 'angular', 'vue'];
// 使用indexOf()根据返回值是否为-1来判断
if (arr.indexOf('react') !== -1) {
  console.log('react存在');
}


// 使用ES7的includes()

let arr = ['react', 'angular', 'vue'];
// 直接返回布尔值 更加直观
if (arr.includes('react')) {
  console.log('react存在');
}
