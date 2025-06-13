/**
 * 获取元素的 transform 属性值
 * @param {HTMLElement} element - 需要获取 transform 的元素
 * @param {*} element
 * @returns
 */
function getMatrixTransform (element) {
  const computedStyle = window.getComputedStyle(element)
  const transformValue = computedStyle.transform

  if (transformValue && transformValue!== 'none') {
    const matrix = new DOMMatrix(transformValue)
    return matrix.m42
  }
  return 0
}

export default {
  computed: {
    useStretchFeature() {
      return this.$props.stretchEnabled && !!this.$props.scrollY && this.isHasOffsetY
    },
  },
  data() {
    return {
      // 是否正在拖动
      isDragging: false,
      // 记录手指开始触摸时的Y坐标
      startY: 0,
      startTime: 0,
      // 当前的translateY值
      currentTranslateY: 0,
      maxTranslateY: 120,
      isMoving: false
    }
  },
  methods: {
    /**
     * 触摸开始事件处理
     * @param {*} event
     */
    containerHandleTouchStart(event) {
      if (!this.useStretchFeature) return
      // const touch = event.changedTouches[0]
      this.startY = event.touches[0].clientY
      this.startTime = Date.now()
      this.isMoving = true
    },
    /**
     * 仅 y 轴滚动执行
     * @param {*} event
    */
   containerHandleTouchMove(event) {
      if (!this.useStretchFeature || !this.isMoving) return

      //  const touch = event.changedTouches[0]
      const currentY = event.touches[0].clientY
      const distance = this.startY - currentY

      // 滚动到底部执行（滚动偏移量 = 表格高度 - 可视口高度）
      if (this.offsetY === (this.state.tableHeight - this.viewportHeight) && distance > 0) {

        const currentTime = Date.now()
        const duration = currentTime - this.startTime

        // 计算速度(距离差/时间差)
        const speed = distance / duration

        // 计算阻尼系数，越接近最大偏移距离阻尼越大
        let damping = 1
        const container = this.$refs.container
        const currentTranslateY = getMatrixTransform(container)
        const remainingDistance = this.maxTranslateY - currentTranslateY
        damping = remainingDistance / this.maxTranslateY

        // 计算新的 translateY
        let newTranslateY = currentTranslateY + (distance * speed * damping)
        newTranslateY = Math.min(newTranslateY, this.maxTranslateY)
        newTranslateY = Math.max(newTranslateY, 0)

        container.style.transform = `translateY(${-newTranslateY}px)`
        container.style.transition = 'transform 0.2s ease'
      } else {
        // 如果没有到达底部，重置 translateY
        this.resetStretch()
      }
    },
    /**
     * 松开手势时 清空动画数据
     * @param {*} event
     */
    containerHandleTouchEnd(event) {

      if (!this.useStretchFeature) return

      this.resetStretch()
    },
    /**
     * 重置各种参数
     */
    resetStretch () {

      this.isMoving = false
      this.startY = 0
      this.startTime = 0

      const container = this.$refs.container
      container.style.transform = 'translateY(0px)'
      container.style.transition = 'transform 0.3s ease'
    }
  },
}
