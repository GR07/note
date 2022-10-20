1. 创建一个文件夹


2. npm 包初始化

npm init


3. npm包信息设置

package name：包名 也就是npm instal xxx

version：版本

description：描述

entry point：入口文件

test command：测试命令（没写暂时不用）回车

git repository：git包（没上传到git暂不设置）回车

keywords：关键词（随便类似描述）

author：作者

license：（ISC）回车

is this ok（yes）


4. 最终目录下生成一个package.json
```js
// 目录结构

// index.js // 打包生成的文件
// package.json 
```


5. 本机登陆npm
```javascript
npm login

Username: guor07 输入用户名
Password: xxxxxx 输入密码（隐藏的不会显示）

// 输出 Logged in as guor07 on https://registry.npmjs.org/.（表示登陆成功！）

```

6. 发布npm包
```javascript
npm publish

// 输出 ... + guorfn@1.0.0 // 表示成功

```

7. 使用

工具函数
```javascript
// npm i guorfn
// 运行 node index.js
let guorfn = require('guorfn')
console.log(guorfn) // 暴露出来的模块对象
```

vue组件
```js
import customTagWaren from "guor-tag"
components: {
  customTagWaren
}
// template
<customTagWaren />
```


8. 更新包版本
```javascript
// 更改文件后，先更新版本号
npm version <可选下面字段更新版本号的规则>

major | minor | patch | premajor | preminor | prepatch | prerelease

// 最后执行 publish 即可
npm publish

```