 // 手写实现find
 function fackReduce(callback, initialValue) {
    if (typeof callback !== "function") {
        throw "参数必须为函数";
    }
    let array = this
    let index = 1;
    // MDN：没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。
    // 如果提供initialValue，从索引0开始
    initialValue ? index = 0 : initialValue = array[0]
    for (index; index < this.length; index++) {
        initialValue = callback.call(null, initialValue, array[index], index, array)
    }
    return initialValue
}


// MDN版本
function fackReduce2(callback) {
    if (this === null) {
        throw new TypeError('Array.prototype.fackReduce2 ' +
            'called on null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback +
            ' is not a function');
    }
    var o = Object(this);
    var len = o.length >>> 0;
    var k = 0;
    var value;
    if (arguments.length >= 2) {
        value = arguments[1];
    } else {
        while (k < len && !(k in o)) {
            k++;
        }
        if (k >= len) {
            throw new TypeError('Reduce of empty array ' +
                'with no initial value');
        }
        value = o[k++];
    }
    while (k < len) {
        if (k in o) {
            value = callback(value, o[k], k, o);
        }
        k++;
    }
    return value;
}


Array.prototype.fackReduce = fackReduce
Array.prototype.fackReduce2 = fackReduce2


let arr = [1, 2, 3, 4, 5, 20]

function addFunc(a, b, index, array) {
    return a + b
}

let S = arr.reduce(addFunc, 2)
let S2 = arr.fackReduce(addFunc, 2)
let S3 = arr.fackReduce2(addFunc, 2)
console.log('S', S)
console.log('S2', S2)
console.log('S3', S3)