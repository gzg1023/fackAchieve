
 function fackMap(callback, thisArg) {
    let array = this
    if (typeof callback !== "function") {
        throw "参数必须为函数";
    }
    let tempArr = []
    for (let index = 0; index < array.length; index++) {
        tempArr.push(callback.call(thisArg, (array[index]), index, array)) 
    }
    return tempArr
}

// MDN方法
function fackMap2(callback, thisArg) {
    var T, A, k;
    if (this == null) {
        throw new TypeError('this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
        T = arguments[1];
    }
    A = new Array(len);
    k = 0;
    while (k < len) {
        var kValue, mappedValue;
        if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
        k++;
    }
    return A;
}

Array.prototype.fackMap = fackMap
Array.prototype.fackMap2 = fackMap2
let arr = [1, 2, 3]

function logFun(item, index, array) {
    console.log('1111', item, index, array)
    return item > 1
}

let S1 = arr.fackMap(logFun)
let S2 = arr.fackMap2(logFun)
let S3 = arr.map(logFun);
console.log(S1)
console.log(S2)
console.log(S3)