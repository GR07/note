# methods

只要触发，每次都会调用。



# computed

只有当依赖的数据发生改变才会调用，起到一个缓存的作用，性能更好。



# watch

监听的数据发生改变时可以做一系列事情，可以支持异步操作。

比如：监听路由参数 做一些事情，例如 foo/:id 组件实例会被复用，所以生命周期不会重新走一遍。



      
    // 三种方式分别实现：根据input的改变输出不同的数组。
    new Vue({
      el: "#app",
      data() {
        return {
          input: '',
          languages: []
        }
      },
      methods: {
        handleSearch() {
          this.languages = [
            'JavaScript',
            'Ruby',
            'Scala',
            'Python',
            'Java',
            'Kotlin',
            'Elixir'
          ].filter(item => item.toLowerCase().includes(this.input.toLowerCase()))
        }
      },
      //
      computed: {
        filteredList() {
          return this.languages.filter((item) => {
            return item.toLowerCase().includes(this.input.toLowerCase())
          })
        }
      },
      watch: {
        input: {
          handler() {
            this.languages = [
              'JavaScript',
              'Ruby',
              'Scala',
              'Python',
              'Java',
              'Kotlin',
              'Elixir'
            ].filter(item => item.toLowerCase().includes(this.input.toLowerCase()))
          },
          immediate: true
        }
      }
    })


  </script>
</body>
</html>