# APP.vue

```js
<template>
  <div id="app">
    <loading v-show="loading"></loading>
    <router-view />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Loading from '@/components/Loading.vue'
  export default {
    name: 'App',
    components: { Loading },
    computed: {
      ...mapGetters(['loading'])
    },
  }
</script>
<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    max-width: 640px;
    margin: 0 auto;
    background-color: #f3f4f6;
  }
</style>

```

# Loading.vue

```js
<template>
  <div class="loading">
    <van-loading type="spinner"
                 color="#7972fe" />
  </div>
</template>

<script>
  export default {
    name: 'LoadingG',
    data () {
      return {}
    },
  }
</script>
<style lang="scss" scoped>
  .loading {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
```

# store.js

```js
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  getters: {
    loading: state => state.loading,
  },
  mutations: {
    SHOW_LOADING (state) {
      state.loading = true
    },
    HIDE_LOADING (state) {
      state.loading = false
    }
  },
  actions: {},
  modules: {},
})

```