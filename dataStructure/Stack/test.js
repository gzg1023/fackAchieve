const Stack = require("./index")


/**
 * 进制转换
 * @param {*} num 需要转换的10进制数
 * @param {*} base 需要转换的进制
 * @returns 
 */
function scale(num, base) {
    let s = new Stack();
    while (num > 0) {
        s.push(num % base);
        num = Math.floor((num /= base));
    }
    return s.getReverseString();
  }
  console.log(scale(125, 2)); // 1111101
  console.log(scale(125, 8)); // 175
