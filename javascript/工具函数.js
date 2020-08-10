/**
 * 大写第一字符
 * @param {String} string
 */
function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 类型判断
function toRawType (value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
// toRawType(null) // "Null"
// toRawType(/sdfsd/) //"RegExp"

// 很多常见的工具库都采用这种方式，极力推荐, void 0 === undefiend
function isUndefined (obj) {
	return obj === void 0;
}
function digitUppercase(n) {
  if (n == 0) {
      return "零";
  }
  if (!/^(\+|-)?(0|[1-9]\d*)(\.\d+)?$/.test(n))
      return "数据非法";
  var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";
  var a = parseFloat(n);
  if (a < 0) {
      n = n.substr(1);
  }
  var p = n.indexOf('.');
  if (p >= 0) {
      n = n.substring(0, p) + n.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - n.length);
  for (var i = 0; i < n.length; i++)
      str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  if (a > 0) {
      return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  } else {
      return "负" + str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
  }
}


module.exports = {
  uppercaseFirst,
  toRawType,
  isUndefined,
  digitUppercase
}