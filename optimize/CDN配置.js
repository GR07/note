// https://juejin.im/post/5c4a6fcd518825469414e062#heading-21

// 对于 vue、vue-router、vuex、axios和element-ui等等这些不经常改动的库

// 我们让webpack不对他们进行打包，通过cdn引入，可以减少服务器的带宽，

// 更能把这些文件缓存到客户端，客户端加载的会更快。


// 配置vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  chainWebpack: config => {
      // 省略其它代码 ······
      // #region 忽略生成环境打包的文件

      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)
    const cdn = {
        css: [
          // element-ui css
          '//unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: [
          // vue
          '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
          // vue-router
          '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
          // vuex
          '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
          // axios
          '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
          // element-ui js
          '//unpkg.com/element-ui/lib/index.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
      // #endregion
    }
  }
}




// index.html 配置模板语法

<% if (process.env.NODE_ENV === 'production') { %>

  <% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%=css%>" rel="preload" as="style">
    <link rel="stylesheet" href="<%=css%>" as="style">
  <% } %>
  <% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
    <link href="<%=js%>" rel="preload" as="script">
    <script src="<%=js%>"></script>
  <% } %>
    
<% } %>
