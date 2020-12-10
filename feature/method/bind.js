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
    const result = () => this.apply(callback, args)
    return result
}

Function.prototype.fackBind = fackBind
const generator = user.getX;
console.log(generator());

const b = generator.bind(user);
console.log(b());

const c = generator.fackBind(user);
console.log(c());