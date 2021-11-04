
## 首先安装 node  http://nodejs.cn/



## 安装淘宝npm 提升速度

npm install --registry=https://registry.npm.taobao.org



## 安装vue-cli 3.0
npm install @vue/cli -g


## yarn 安装vue-cli后 vue --version 提示不是内部命令解决方案
https://blog.csdn.net/ddx2019/article/details/104487161


## 先清yarn 的缓存 yarn cache clean, 然后再重新 yarn即可

问题描述：报错 yarn ：Fetching packages... error An unexpected error occurred: "C:\\Users\\***\\AppData\\Local\\Y..

## 创建项目
vue create my-project

### 选版本or自定义

Default [vue2] 选择2版本
Default [vue3] 选择3版本
Manually select features 自定义配置


### 选择版本

2.x
3.x



### 分支 vue2 / vue3



### vue3

#### 是否使用ts / babel / style-class

都是 N

eslint 默认选择第一个


#### vue3项目结构


##### shims-vue.d.ts

因为vue文件在ts中是不认可的，所以需要这个定义文件去定义，让ts认识vue。


##### .eslintrc.js

eslint 配置文件


##### .browserslistrc

兼容文件一般不动



##### .gitignore

上传时不需上传的文件


##### tsconfig

ts的配置文件


##### package.json

```json
{
  "name": "vue3-guor",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve", // 预览开发效果
    "build": "vue-cli-service build", // 生产的打包
    "lint": "vue-cli-service lint" // 检查代码编写规范
  },
  "dependencies": {
    "vue": "^3.0.0"
  },
  // 开发环境下面的所有插件在生产环境中是不会被打包的！！！
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^2.33.0",
    "@typescript-eslint/parser": "^2.33.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-typescript": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0",
    "@vue/eslint-config-typescript": "^5.0.2",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0-0",
    "typescript": "~3.9.3"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended",
      "@vue/typescript/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 2020
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}

```





### vue2

// 使用 create 命令创建项目的时候，有很多配置项需要选择。
TypeScript 支持使用 TypeScript 书写源码
Progressive Web App (PWA) 谷歌提出的桌面应用app
Router 支持 vue-router 。
Vuex 支持 vuex 。
CSS Pre-processors 支持 CSS 预处理器。
Linter / Formatter 支持代码风格检查和格式化。
Unit Testing 支持单元测试。
E2E Testing 支持 E2E 测试。

    
      // 这里需要选择路由模式，yes 是 history 模式，no 是 hash 模式，实际项目通常采用 history 模式。
      Use history mode for router? (Requires proper server setup for index fallback in production) Yes

      // 推荐使用dart-sass。
      Sass/SCSS (with dart-sass) 
      Sass/SCSS (with node-sass) 
      Less 
      Stylus 
     

      // 使用ESLint+Prettier来统一前端代码风格
      Pick a linter / formatter config: 
      ESLint with error prevention only 
      ESLint + Airbnb config 
      ESLint + Standard config 
    ❯ ESLint + Prettier 


      // 语法检查 保存时检测
      ? Pick additional lint features:
      Lint on save // 保存时检测
      Lint and fix on commit // 提交检测


      // 选择 Babel、PostCSS、ESLint等配置文件存放位置 独立保存
      Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
      In dedicated config files // 独立文件夹位置
      In package.json // 在package.json文件里


      // 询问是否记录这一次的配置，以便下次使用，下次创建项目时会出现vuecli3的选项可供选择，指向的vuecli3是因为这次记录过的cli3配置，第一次执行create是没有的。
      ? Save this as a preset for future projects? (y/N) 



      // 5.启动项目
      cd my-project
      npm run serve



      



    注意：

    1.使用图片时防止打包后目录出错，建议使用变量形式 
      // <img :src="logo"/>
      // logo: require('../../assets/images/logo.png')


    2.dependencies与devDependencies
      // dependencies字段指项目运行时所依赖的模块；
      // devDependencies字段指定了项目开发时所依赖的模块；