/**
 * 大写第一字符
 * @param {String} string
 */
export function uppercaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// 类型判断
export function toRawType (value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}
toRawType(null) // "Null"
toRawType(/sdfsd/) //"RegExp"

// 很多常见的工具库都采用这种方式，极力推荐, void 0 === undefiend
export function isUndefined (obj) {
	return obj === void 0;
}