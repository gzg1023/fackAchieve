 // 手写实现find
 function fackFind(callback, thisArg) {
    let temoItem = undefined
    let array = this
    for (let index = 0; index < array.length; index++) {
        if (callback.call(thisArg, array[index], index, array)) {
            temoItem = array[index]
            break;
        }
    }
    return temoItem
}

// MDN官方
function fackFind2(callback) {
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
    }
    var thisArg = arguments[1];
    var k = 0;
    while (k < len) {
        var kValue = o[k];
        if (callback.call(thisArg, kValue, k, o)) {
            return kValue;
        }
        k++;
    }
    return undefined;
}

Array.prototype.fackFind = fackFind
Array.prototype.fackFind2 = fackFind2

let arr = [1, 2, 3, 2, 5]

function logFun(item) {
    return item == 2
}

let S = arr.fackFind(logFun)
console.log(S)

let T = arr.fackFind2(logFun)
console.log(T)

let Z = arr.find(logFun)
console.log(Z)