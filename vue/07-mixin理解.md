# mixin是什么

mixin 就是对一部分操作流程进行抽出复用，本质其实就是一个 js 对象，可以包含组件中任意功能选项，如 data、components、methods 、created、computed 等等。


# 冲突问题

1. 当组件存在与 mixin 对象相同的选项的时候，递归合并的时候，组件会覆盖 mixin 的选项

2. 如果选项为生命周期钩子的时候，会合并成一个数组，先执行 mixin 的钩子，再执行组件的钩子


# 常规例子

```js
// 组件一
const Modal = {
    template: '#modal',
    data() {
        return {
            isShowing: false
        }
    },
    methods: {
        toggleShow() {
            this.isShowing = !this.isShowing;
        }
    },
    components: {
        appChild: Child
    }
}

// 组件二
const Tooltip = {
    template: '#tooltip',
    data() {
        return {
            isShowing: false
        }
    },
    methods: {
        toggleShow() {
            this.isShowing = !this.isShowing;
        }
    },
    components: {
        appChild: Child
    }
}


// 以上的逻辑是一样的 可以提取逻辑并创建可以被重用的项
const toggle = {
    data() {
        return {
            isShowing: false
        }
    },
    methods: {
        toggleShow() {
            this.isShowing = !this.isShowing;
        }
    }
}

const Modal = {
    template: '#modal',
    mixins: [toggle],
    components: {
        appChild: Child
    }
};

const Tooltip = {
    template: '#tooltip',
    mixins: [toggle],
    components: {
        appChild: Child
    }
};
```