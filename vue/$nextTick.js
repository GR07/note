/**
 * 简单来说，Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
 */


// 改变数据
vm.message = 'changed'

// 想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

// 这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
  console.log(vm.$el.textContent) //可以得到'changed'
})



// 箭头函数 or 普通函数

// 全局方法 nextTick 函数接受两个参数：回调函数 / this指向

// 因为 Vue 实例方法 $nextTick 做了进一步封装，把 this 设置为了当前 Vue 实例，所以实例里 箭头函数 普通函数 this 都指向实例。



// 2.1版本nextTick的实现做了对 promise 的支持 nextTick() 如果没有提供回调且在支持 Promise 的环境中，优先是返回一个 Promise；



// 所以性能没有极致要求 也可以用 async await 形式要优雅些。


// 应用场景：需要在视图更新之后，基于新的视图进行操作。



// 需要注意的是，在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。


// 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 
