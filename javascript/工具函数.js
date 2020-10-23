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

// 金额转大写
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

// 百度经纬度转高德
function bMapTransMap(lng, lat) {
  // eslint-disable-next-line camelcase
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  // eslint-disable-next-line camelcase
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  // eslint-disable-next-line camelcase
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta);
  let lats = z * Math.sin(theta);
  return {
      lng: lngs,
      lat: lats
  };
}

import dayjs from "dayjs"
// 本日
const today = dayjs().format("YYYY-MM-DD")
// 本周
const week = [
    dayjs().startOf("week").format("YYYY-MM-DD"),
    today
]
// 本月
const month = [
    dayjs().date(1).format("YYYY-MM-DD"),
    today
]

const reg = {
  // 1-30内的正整数
  integer30: /^([12][0-9]|30|[1-9])$/,
  // 0-10内的正整数
  integer10: /^([0-9]|10)$/,
  // 大于0且不超过二位小数的数字
  money: /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/
}
module.exports = {
  uppercaseFirst,
  toRawType,
  isUndefined,
  digitUppercase,
  bMapTransMap
}