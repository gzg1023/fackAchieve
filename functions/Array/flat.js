/**
 * @description 拍平数组
 * 编写思路
 * 1. 可指定的深度处理
 * 2. 递归遍历数组
 * 3. 会移除数组中的空项
 * 3. 返回结果是新数组
*/

let arr = [1, , 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];


//  深度默认为1
function fackFlat(depth = 1) {
    const tempArr = []
    function deepArr(arr, depth) {
        // forEach循环会自动过滤空值，如果使用其他循环，需要手动过滤空值
        arr.forEach(element => {
            // 如果是数组，而且深度还存在，则继续调用
            if (Array.isArray(element) && depth > 0) {
                deepArr(element, --depth)
            } else {
                tempArr.push(element)
            }
        });
    }
    // 通过this拿到调用的数组
    deepArr(this, depth)
    return tempArr

}

// MDN reduce版本
function fackFlat2(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) =>
        acc.concat(Array.isArray(val) ? fackFlat2(val, d - 1) : val), []) : arr.slice();
};




Array.prototype.fackFlat = fackFlat

console.log(arr.flat(Infinity))
console.log(arr.fackFlat(Infinity))
console.log(fackFlat(arr, Infinity));