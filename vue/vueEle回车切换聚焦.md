```js

// 执行
mounted() {

    // 创建监听
    window.addEventListener("keydown", this.enterCallback);

    this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("keydown", this.enterCallback);
    });

},
```

```js
methods: {
    /**
        * 获取 传入dom的下一个或上一个 兄弟元素下面的 el-input__inner 元素
        * @param {Object} container 传入dom
        * @param {String} nextOrPreEl nextElementSibling / previousElementSibling
        * @param {Boolean} isRow 是否换行处理
        * @returns {Object} el-input__inner 元素
        */
    focusFindInput(container, nextOrPreEl, isRow) {

        // 查找是否存在 下一个 或 上一个 兄弟元素，没有则退出
        let element = container[nextOrPreEl];
        if (!element) return;

        // 查找 第一个 input 元素 or 最后一个 input 元素
        let input;
        if (isRow) {
            input = element.querySelectorAll("input")[element.querySelectorAll("input").length - 1];
        } else {
            input = element.querySelectorAll("input")[0];
        }

        // select 处理
        while (input && input.id === "el-select") {

            // 查找是否存在 下一个 或 上一个 兄弟元素，没有则退出
            element = element[nextOrPreEl];
            if (!element) return;
            
            // 查找 第一个 input 元素 or 最后一个 input 元素
            if (isRow) {
                input = element.querySelectorAll("input")[element.querySelectorAll("input").length - 1];
            } else {
                input = element.querySelectorAll("input")[0];
            }

        }
        if (input && input.className.includes("el-input__inner")) return input;
    },

    /**
        * 查找当前聚焦元素外层的可切换的父容器
        * @param {Object} el 当前聚焦元素
        * @param {String} className 固定类名的父容器
        * @returns {Object} 外层的可切换的父容器
        */
    focusFindOuter(el, className) {
        // 当前聚焦元素的父元素
        const parent = el.parentElement;
        if (!parent) return document.body;
        // 找到了 el-table_1_column_" 就返回
        if (parent.className.includes(className)) {
            return parent;
        }
        // 否则 继续找
        return this.focusFindOuter(parent, className);
    },

    // run
    enterCallback(e) {
        // enter
        if (e.keyCode === 13 || e.keyCode === 39) {

            const container = focusFindOuter(document.activeElement, "el-table_3_column_");

            // 存在 el-input__inner 则 聚焦 并 选中文本
            if (focusFindInput(container, "nextElementSibling", false)) {
                focusFindInput(container, "nextElementSibling", false).focus();
                setTimeout(() => {
                    focusFindInput(container, "nextElementSibling", false).select();
                }, 0);
            }

            // 不存在 则 行处理判断
            if (!focusFindInput(container, "nextElementSibling", false)) {

                // 当前行 row
                const container = focusFindOuter(focusFindOuter(document.activeElement, "el-table_3_column_"), "el-table__row");

                if (focusFindInput(container, "nextElementSibling", false)) {
                    focusFindInput(container, "nextElementSibling", false).focus();
                    setTimeout(() => {
                        focusFindInput(container, "nextElementSibling", false).select();
                    }, 0);
                }
                
            }
            
        }
        // left
        if (e.keyCode === 37) {

            const container = focusFindOuter(document.activeElement, "el-table_3_column_");

            // 存在 el-input__inner 则 聚焦 并 选中文本
            if (focusFindInput(container, "previousElementSibling", false)) {

                focusFindInput(container, "previousElementSibling", false).focus();

                setTimeout(() => {
                    focusFindInput(container, "previousElementSibling", false).select();
                });
            }

            // 不存在 则 行处理判断
            if (!focusFindInput(container, "previousElementSibling", false)) {

                // 当前行 row
                const container = focusFindOuter(focusFindOuter(document.activeElement, "el-table_3_column_"), "el-table__row");

                if (focusFindInput(container, "previousElementSibling", true)) {
                    focusFindInput(container, "previousElementSibling", true).focus();
                    setTimeout(() => {
                        focusFindInput(container, "previousElementSibling", true).select();
                    }, 0);
                }
                
            }

        }

    }
}
```

参考思路：https://www.jb51.net/article/180788.htm