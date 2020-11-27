function fackFiliter(callback, thisArg) {
    let array = this
    let tempArr = []
    if (typeof callback !== "function") {
        throw "参数必须为函数";
    }
    for (let index = 0; index < array.length; index++) {
        if (callback.call(thisArg, (array[index]), index, array)) {
            tempArr.push((array[index]))
        }
    }
    return tempArr
}

// MDN官方filter
function fackFiliter2(callback, thisArg) {
    if (!((typeof callback === 'Function' || typeof callback === 'function') && this))
        throw new TypeError();
    var len = this.length >>> 0,
        res = new Array(len),
        t = this, c = 0, i = -1;
    if (thisArg === undefined) {
        while (++i !== len) {
            if (i in this) {
                if (callback(t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    }
    else {
        while (++i !== len) {
            if (i in this) {
                if (callback.call(thisArg, t[i], i, t)) {
                    res[c++] = t[i];
                }
            }
        }
    }
    res.length = c;
    return res;
}

Array.prototype.fackFiliter = fackFiliter
Array.prototype.fackFiliter2 = fackFiliter2

let arr = [1, 2, 3]

function filiterFunc(item){
    return item >= 2
}

let S = arr.fackFiliter(filiterFunc)
console.log(S)

let T = arr.fackFiliter2(filiterFunc)
console.log(T)

let Z = arr.filter(filiterFunc)
console.log(Z)