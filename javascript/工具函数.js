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
function digitUppercase(price) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(price);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

module.exports = {
  uppercaseFirst,
  toRawType,
  isUndefined,
  digitUppercase
}