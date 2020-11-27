  // 手写实现every
  function fackEvery(callback, thisArg) {
    let tempFlag = true
    let array = this
    for (let index = 0; index < array.length; index++) {
        if (!callback.call(thisArg, array[index], index, array)) {
            tempFlag = false
        }
    }
    return tempFlag
}

// MDN官方every
function fackEvery2(callback, thisArg) {
    var T, k;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError();
    }
    if (arguments.length > 1) {
        T = thisArg;
    }
    k = 0;
    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];
            var testResult = callback.call(T, kValue, k, O);
            if (!testResult) {
                return false;
            }
        }
        k++;
    }
    return true;
}

Array.prototype.fackEvery = fackEvery
Array.prototype.fackEvery2 = fackEvery2
let arr = [1, 2, 3]

function isHasBig(item){
    return item >= 2
}

let S = arr.fackEvery(isHasBig)
console.log(S)
let T = arr.fackEvery2(isHasBig)
console.log(T)
let Z = arr.every(isHasBig)
console.log(Z)