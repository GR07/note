/**
 * 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
 */
let abc: [string, number, number] = ['guor', 25, 34];


/**
 * 只能赋值或访问一个已知索引的元素。
 */
let guor: [string, number, number];
guor[0] = 'guor';
guor[2] = 25;
guor[0].slice(1);
guor[1].toFixed(2);



/**
 * 直接对元组初始化 或者 赋值 时，必须提供所有类型项
 */
let xcatliu: [string, number];
xcatliu = ['Xcat Liu', 25];



/**
 * 添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型。
 */
let yue: [string, number];
yue = ['guor', 25];
// 新增的类型只能是 string / number
yue.push('http://yue.com/');
// yue.push(true); // 报错