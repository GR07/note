# 作用不变，写法不同



# 区别
export / import 可以用于全局范围的数据共享，无法限制到局部。

provide / inject 主要用于局部范围的数据共享，可以放在根组件变成整个 App 的数据共享。



下面这种写法，可以用于全局范围的数据共享，无法限制到局部

```js
// Root.js
export const sharedData = ref('')

export default {
  name: 'Root',
  setup() { 
    // ...
  },
  // ...
}

// 在子组件里
// Child.js

import { sharedData } from './Root.js'

export default {
  name: 'Root',
  setup() { 
    // 这里直接使用 sharedData 即可
  }
}
```

setup写法

```js
// 常量文件
const sharedDataSymbol = Symbol('sharedData');

// provide父
setup() {

    const selectGirl = ref('xxx11');

    provide(sharedDataSymbol, selectGirl)

    const btn: () => void = () => {
      selectGirl.value = '123';
    }
    
    return {
      btn
    }
  }


// inject子
setup() {
    const location = inject(sharedDataSymbol);
    return { 
        location
    }
}
```