
打包路径配置：

因为默认打包后文件的路径是 /js/asdasdasd.js

需要把 / 去掉 js/asadasd.js
```javascript
// vue.config.js 文件
module.exports = {
  publicPath: "./"
};

```



```javascript
chainWebpack: config => {
        config.entry('main').add('babel-polyfill');
        config.plugin('html').tap(args => {
            args[0].cdn = {
                js: [
                    '//api.map.baidu.com/api?v=2.0&ak=VybvSG3RqpGQzp6GwlzNOmiq&s=1',
                    '//api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js'
                ]
            };
            return args;
        })
        config.resolve.alias.set("@", path.resolve(__dirname, "src"));
        config.resolve.alias.set("@public", path.resolve(__dirname, "public"));
        config.resolve.alias.set(
            "@config",
            path.resolve(__dirname, "src/config")
        );
        config.resolve.alias.set("@api", path.resolve(__dirname, "src/api"));
        config.resolve.alias.set(
            "@com",
            path.resolve(__dirname, "src/components")
        );
        config.resolve.alias.set(
            "@store-m",
            path.resolve(__dirname, "src/store/modules")
        );

        /**** svg图标处理 添加压缩loader "image-webpack-loader" */

        // 修改svg-loader 不包含icons列表
        config.module
            .rule("svg")
            .exclude.add(path.resolve(__dirname, "src/assets/img/icons"))
            .end()
            .use("image-webpack")
            .loader("image-webpack-loader")
            .tap((options = {}) =>
                Object.assign(options, {
                    disable: false
                })
            )
            .end();
        // 兼容 ie ES6语法 使用 babel 处理 vue-awesome-countdown/ element-ui
        config.module
            .rule("plugin")
            .test(/\.js$/)
            .include.add(path.resolve("node_modules/_vue-awesome-countdown@1.0.26@vue-awesome-countdown"))
            .add(path.resolve("node_modules/_element-ui@2.13.1@element-ui/packages"))
            .add(path.resolve("node_modules/_element-ui@2.13.1@element-ui/src"))
            .end()
            .use("babel")
            .loader('babel-loader')
            .end()
    },

```