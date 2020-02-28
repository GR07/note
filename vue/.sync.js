/**
 * 有时候我们只是想改变父组件里的一个属性, 可以简化为以下
 *  
 */
<child :show.sync = false></child>
props: {
  show: false
}
this.$emit('update:show', true)