function a (a, b) {
  let arr = []
  return new Promise((resolve, reject) => {
    reject(1)
  })
}

const b = a()

console.log(b.catch(err => console.log(err)))