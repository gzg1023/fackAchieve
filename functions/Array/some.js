function fackSome(callback, thisArg) {
    let tempFlag = false
    let array = this
    for (let index = 0; index < array.length; index++) {
        if (callback.call(thisArg, array[index], index, array)) {
            tempFlag = true
        }
    }
    return tempFlag
}

// MDN官方filter
function fackSome2(callback, thisArg) {
    if (this == null) {
        throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof callback !== 'function') {
        throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
        if (i in t && callback.call(thisArg, t[i], i, t)) {
            return true;
        }
    }

    return false;
}

Array.prototype.fackSome = fackSome
Array.prototype.fackSome2 = fackSome2

let arr = [1, 2, 3]

function logFun(item) {
    return item == '3'
}

let S = arr.fackSome(logFun)
console.log(S)

let T = arr.fackSome2(logFun)
console.log(T)

let Z = arr.some(logFun)
console.log(Z)