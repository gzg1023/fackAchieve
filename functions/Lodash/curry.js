

function getSum(a, b, c) {
  return a + b + c
}
// es6
function fackCurry3(callback) {
  return curryHandle = (...args) => {
    // 如果参数相同，直接返回结果
    if (args.length >= callback.length) {
      return callback(...args)
    } else {
      // 参数不足，则返回函数
      return (...args2) => curryHandle(...args.concat((args2)))
    }
  }
}

// es5
function fackCurry2(callback) {
  return function curryHandle() {
    var args = Array.prototype.slice.call(arguments)
    if (args.length >= callback.length) {
      return callback.apply(null, args)
    } else {
      return function () {
        var args2 = Array.prototype.slice.call(arguments)
        return curryHandle.apply(null, args.concat(args2))
      }
    }
  }
}

// 柯里化后的函数
let curried = fackCurry2(getSum) // 测试

console.log(curried(1, 2, 3))
console.log(curried(1)(2,3))
console.log(curried(1, 2)(3))
console.log(curried(1)(2)(3))
