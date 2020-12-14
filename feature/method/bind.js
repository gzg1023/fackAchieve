/** 
 * 编写思路
 * 1.返回一个原返回一个函数
 * 2.传递参数并绑定传入的this
 * 3.可以通过new调用
*/
const user = {
    x: 42,
    getX: function () {
        return this.x;
    }
};

function fackBind(thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('当前调用bind方法的不是函数！')
    }
    const callback = thisArg || (typeof window !== 'undefined' ? window : globalThis)
    return () => this.apply(callback, args)
}

// MDN版本
function fackBind2(otherThis) {
    if (typeof this !== 'function') {
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var ArrayPrototypeSlice = Array.prototype.slice;
    var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP = function () { },
        fBound = function () {
            baseArgs.length = baseArgsLength; // reset to default base arguments
            baseArgs.push.apply(baseArgs, arguments);
            return fToBind.apply(
                fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
            );
        };

    if (this.prototype) {
        fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};

Function.prototype.fackBind = fackBind
Function.prototype.fackBind2 = fackBind2

const generator = user.getX;

const a = generator.bind(user);
console.log(a());

const b = generator.fackBind(user);
console.log(b());

const c = generator.fackBind2(user);
console.log(c());
