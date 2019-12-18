/**
 * String.prototype.padStart \ String.prototype.padEnd
 * 
 * 允许将空字符串或其他字符串添加到原始字符串的开头或结尾。
 * 
 */

// String.padStart(targetLength,[padString])

// targetLength:当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

// padString:(可选)填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断，此参数的缺省值为 " "。

console.log('0.0'.padStart(4,'10')) //10.0
console.log('0.0'.padStart(20))// 0.00   

console.log('0.0'.padEnd(4,'0')) //0.00    
console.log('0.0'.padEnd(10,'0'))//0.00000000

