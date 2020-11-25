// 手写实现forEach
function fackForEach(callback, thisArg) {
    let array = this
    var _this;
    if (typeof callback !== "function") {
        throw "参数必须为函数";
    }
    for (let index = 0; index < array.length; index++) {
        callback.call(thisArg, (array[index]), index, array)
    }
}

// MDN方法
function fackForEach2(callback, thisArg) {
    var T, k;
    if (this == null) {
        throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
        T = thisArg;
    }
    k = 0;
    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
        }
        k++;
    }
}

Array.prototype.fackForEach = fackForEach

Array.prototype.fackForEach2 = fackForEach2

let arr = [1, 2, 3]

arr.fackForEach((item, index, array) => {
    console.log('1111', item, index, array)
})

arr.fackForEach2((item, index, array) => {
    console.log('2222', item, index, array)
})

// 原生forEach
arr.forEach((item, index, array) => {
    console.log("3333", item, index, array)
});