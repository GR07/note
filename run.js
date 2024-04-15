let index = 1
const delay = () => {
  const now = Date.now()
  while (Date.now() - now < 200);
}
const start = () => {
  const ticker = setInterval(() => {
    // 为了方便在性能看板观察间隔时长
    performance.measure(`setTimeout间隔${index}`, `setTimeout间隔${index}`)

    // 耗时操作200ms
    delay()

    if (index++ >= 5) {
      clearInterval(ticker)
      return
    }

    performance.mark(`setTimeout间隔${index}`)
  }, 100)
}
performance.mark(`setTimeout间隔${index}`)
start()
