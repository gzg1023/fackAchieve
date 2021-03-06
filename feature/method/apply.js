// 思路同call，参数不一样
const arr = [1, 2, 3, 4, 5]
function fackApply(context, arg) {
    if (typeof this !== 'function') {
        throw new TypeError('当前调用apply方法的不是函数！')
    }
    const flag = Symbol('function')
    const callback = context || (typeof window !== 'undefined' ? window : globalThis)
    callback[flag] = this
    // 同call一样，只是参数需要展开
    const result = callback[flag](...arg)
    delete callback[flag]
    return result
}

Function.prototype.fackApply = fackApply

// const max = Math.max(arr);

// const max = Math.max.apply(null, arr);

const max = Math.max.fackApply(null, arr);

console.log(max)