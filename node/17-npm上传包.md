1.创建一个文件夹

2.npm包的初始化
```javascript
npm init
```

3.npm包信息设置

package name：包名

version：版本

description：描述

entry point：入口文件

test command：测试命令（没写暂时不用）回车

git repository：git包（没上传到git暂不设置）回车

keywords：关键词（随便类似描述）

author：作者

license：（ISC）回车

is this ok（yes）


4.最终目录下生成一个package.json


5.本机登陆npm
```javascript
npm login

Username: guor07 输入用户名
Password: xxxxxx 输入密码

// 输出 Logged in as guor07 on https://registry.npmjs.org/.（表示登陆成功！）

```

6.发布npm包
```javascript
npm publish

// 输出 + guorfn@1.0.0 // 表示成功

```

7.使用
```javascript
// npm i guorfn
// 运行 node index.js
let guorfn = require('guorfn')
console.log(guorfn) // 暴露出来的模块对象
```

8.更新包版本
```javascript
// 更改文件后，先更新版本号
npm version <可选下面字段更新版本号的规则>

major | minor | patch | premajor | preminor | prepatch | prerelease

// 最后执行 publish 即可
npm publish

```

工具包内容：
```javascript
// func.js 一定要暴露出来 module.exports
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

module.exports = {
  uppercaseFirst,
  toRawType,
  isUndefined
}
```