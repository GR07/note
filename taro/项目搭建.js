/**
 * 用 react 写完代码就可以用 taro 转换器转换成 小程序.
 * 
 * 
 * 
 * 1.全局安装脚手架: npm install -g @tarojs/cli
 * 
 * 
 * 2.创建项目: taro init learn1
 * 项目名称: learn1
 * 是否使用TS: Y
 * 预处理器: sass
 * 模板: 默认模板
 * 
 * 
 * 3.启动项目: npm run dev:weapp (项目类型不同运行和打包模式也不同)
 * 小程序开发工具https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
 * 
 * 
 * 注意: 如果小程序有修改不要直接修改 dist 目录, 一定要修改整个 taro 项目, 这就是 taro 精髓, 一套代码维护多个项目
 * 
 * 
 * 更新到最新版本: taro update self
 */





 /**
  * Taro 目录结构: 
  * 
  * .temp         临时的不需要改任何东西
  * config        项目配置文件/ dev.js 开发时候的配置 / index.js 开发和打包的默认配置 / prod.js 打包的配置
  * dist          生成的项目目录(比如小程序 / H5)
  * node_modules  项目依赖包
  * src           项目源文件修改都在这
  * package.json  安装的依赖及命令
  * project.config类似vue.config
  * 
  */

