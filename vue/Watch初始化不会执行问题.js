/**
 * 当 watch 一个变量的时候，初始化时并不会执行，
 * 如下面的例子，你需要在created的时候手动调用一次。
 */
watch: {
  searchText: 'fetchUserList',
},
created() {
  this.fetchUserList();
}

// 可以添加immediate属性，这样初始化的时候也会触发
watch: {
  searchText: {
    handler: 'fetchUserList',
    immediate: true,
  }
}
