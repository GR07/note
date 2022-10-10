# 升级思路


- cli 版本

因为我们是基于cli脚手架项目，首先你要去确认 vue-cli 从哪个版本开始支持的 ts，如果 cli 版本过低，只能去升级cli。

结论：cli3以上都可以支持


- 引入依赖

我个人更倾向于渐进式平滑迁移，降低迁移成本，因此只引入必要依赖，尽量贴近 vue 语法，后面再根据需要引入非官方依赖。

我通过安装一个 vue-cli3的项目 选装 ts 生成的 package.json 去确认必要依赖。 

结论：必要依赖 typescript、ts-loader


- 各依赖之前的兼容

这是个很麻烦的问题，不断翻文档找答案。


- 升级前暂时卸载 eslint

最初升级我不指定版本号直接安装 typescript、ts-loader 依赖，然后改造 vue 文件 ts 文件，运行起来很多的报错，这时我已经分不清报错原因，

因为以下原因都有可能，依赖包的版本问题、eslint 的校验问题、tsconfig 配置问题、vue 文件改造产生的语法错误。

所以我卸载 eslint 相关的所有依赖，把问题分解，分块去解决，先专注于 vue-cli + ts 能否运行成功，之后再考虑处理 eslint 的校验兼容。




# 具体改造过程

1. 安装依赖 typescript、ts-loader

2. tsc -init 生成 tsconfig.json 文件

3. 把一个 js 文件改为 ts 后缀，import 引入 vue 文件

4. vue 文件 script 类型改为 lang = 'ts'

5. 创建 .d.ts 文件，在声明文件中对 vue 进行声明，原因 ts 无法识别 .vue 文件