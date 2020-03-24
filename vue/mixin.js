// 我的理解 mixin 就是对一部分操作流程进行抽出复用


// 例子：

// 功能一模态框
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

// 功能二提示框
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


// 以上的逻辑是一样的 我们可以在这里提取逻辑并创建可以被重用的项
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



// mixins 中的生命周期函数仍然是可用的

// 默认Mixin上会首先被注册，组件上的接着注册，这样我们就可以在组件中按需要重写Mixin中的语句，组件拥有最终发言权。

// 就是组件的生命周期会覆盖掉 mixin 的生命周期。

// 注意：mixin 的并没有被销毁，它只是被重写了。

