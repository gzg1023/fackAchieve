function getArea(r) {
    console.log(r)
    return Math.PI * r * r
}

function fackMemoize(callback) {
    if (typeof callback != 'function') {
        throw new TypeError('传入的内容不是函数');
    }
    let cache = {}
    return function (val) {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || callback.call(callback, val)
        return cache[key]
    }
}


let getAreaWithMemory = fackMemoize(getArea)

console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))


