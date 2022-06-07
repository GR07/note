# Q 执行 npm run xxx 发生了什么

首先会去项目的 package.json 文件里找 scripts 里找对应的 xxx，然后执行 xxx 的命令，例如启动vue项目 npm run serve 的时候，实际上就是执行了vue-cli-service serve 这条命令


# Q 为什么 不直接执行 vue-cli-service serve 而要执行 npm run serve 呢

因为会报错，操作系统中没有存在 vue-cli-service 这一条指令，除非全局安装 -g


# Q 既然 vue-cli-service 这条指令不存在操作系统中，为什么执行 npm run serve 能成功

- 因为在 npm install xxx 第三方包时，npm 读到第三方包的 package.json 配置时，就将第三方包的软链接映射到 项目根目录 ./node_modules/.bin 目录下生成相应的脚本文件 vue-cli-service.cmd。

- npm run 时候，npm 会到 ./node_modules/.bin 中找到安装时生成的相应脚本文件 vue-cli-service 作为 脚本来执行，相当于执行了 ./node_modules/.bin/vue-cli-service serve

- 所以当我们运行 vue-cli-service serve 这条命令的时候，就相当于运行 node_modules/.bin/vue-cli-service.cmd serve

- 这里有一个执行查找优先级
  1. 当前项目目录的 ./node_modules/.bin/xxx
  2. 全局的 node_modules/.bin 中查找，npm i -g xxx就是安装到到全局目录
  3. 如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序

并且 npm 还会自动把 node_modules/.bin 加入 $PATH，这样就可以直接使用 npm run 作为命令运行。

```js
// 第三方包的 package.json
"author": {
  "name": "Evan You"
},
"bin": {
  "vue-cli-service": "bin/vue-cli-service.js"
},
```

```js
// ./node_modules/.bin 目录下生成相应的脚本文件 vue-cli-service.cmd
// 最后找到相应的js文件（bin\vue-cli-service.js）用 node 来执行
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\@vue\cli-service\bin\vue-cli-service.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\@vue\cli-service\bin\vue-cli-service.js" %*
)
```

