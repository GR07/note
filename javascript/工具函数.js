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

/**
 * 保留几位小数
 * @param {String} value 当前输入
 * @param {Number} how 保留几位
 * @returns {String} 替换后的值
 */
export function decimals(value, how) {
  // 必须数字
  let mustNum = /[^\d.]/g;
  // 小数前几位
  let beforeFloat = /^(\d{4,})[^.]$/g;
  // 必有小数点
  let mustFloat = /^\./g;
  // 只有一个小数点
  let onlyFloat = /\.{2,}/g;
  // 两位小数
  let twoNum = /^(\d+)\.(\d{1,2}).*$/g;
  // 四位小数
  let fourNum = /^(\d+)\.(\d{1,4}).*$/g;

  if (how === 2) {
      return value.replace(mustNum,"").replace(beforeFloat,"$1").replace(mustFloat,"").replace(onlyFloat,".").replace(twoNum,"$1.$2");
  }
  if (how === 4) {
      return value.replace(mustNum,"").replace(mustFloat,"").replace(onlyFloat,".").replace(fourNum,"$1.$2");
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
// 替换
this.form.printInfo = this.form.printInfo.replace(/\\n/gm,"\n")
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