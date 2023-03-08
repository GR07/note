const createEnumNewJob = (down, up) => {
  // 相等则只有一项
  if (Object.is(down, up)) {
    return [{ 'label': down, 'value': down }]
  }

  // 类型 M A Q P
  const type = down.substring(0, 1)
  // 下限-大阶段
  const downbig = down.substring(1, 2)
  // 下限-小阶段
  const downSmall = down.substring(down.length - 1, down.length)
  // 上限-大阶段
  const upBig = up.substring(1, 2)
  // 上限-小阶段
  const upSmall = up.substring(up.length - 1, up.length)

  let levelList = []
  for (let i = +downSmall; i <= +upSmall; i++) {
    // 构建从职级下限到上限
    const k = `${type}${downbig}.${i}`
    const item = {
      'label': k,
      'value': k
    }
    levelList.push(item)
  }
  return levelList
}

let arr = createEnumNewJob('M2.2', 'M2.3')

console.log(arr);