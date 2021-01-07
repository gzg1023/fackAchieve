/**
 * @description 判断数组中是否包含某个元素
 * 编写思路
 * 1. 传入需要判断的值在数组中判断
 * 2. 如果存在就返回true，不存在就返回false
 * 3. 从fromIndex 索引处开始查找 valueToFind，默认0
*/

let arr = [1, 2, 3, 4, 5];

let testItem = 1

function fackIncludes(valueToFind, fromIndex = 0) {
    if (!Array.isArray(this)) {
        throw "非法调用";
    }
    let findFlag = false
    for (let index = fromIndex; index < this.length; index++) {
        if (this[index] === valueToFind) {
            findFlag = true
        }
    }
    return findFlag
}


// MDN 实现
function fackIncludes2(valueToFind, fromIndex = 0) {
    if (this == null) {
        throw new TypeError('"this" is null or not defined');
    }
    var o = Object(this)
    var len = o.length >>> 0
    if (len === 0) {
        return false;
    }
    var n = fromIndex | 0;
    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    while (k < len) {
        if (sameValueZero(o[k], valueToFind)) {
            return true;
        }
        k++;
    }
    return false;
}


Array.prototype.fackIncludes = fackIncludes
Array.prototype.fackIncludes2 = fackIncludes2

console.log(arr.includes(testItem, 2))
console.log(arr.fackIncludes(testItem, 2))
console.log(arr.fackIncludes2(testItem, 2))