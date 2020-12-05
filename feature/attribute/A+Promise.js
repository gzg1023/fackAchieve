const PENDING = 'pending';
const RESOLVE = 'fulfilled';
const REJECT = 'rejected';
class Promise {
    constructor(executor) {
        // 参数校验，只能传递函数
        if (typeof executor !== 'function') {
            throw (`Promise resolver ${executor} is not a function`);
        }
        this.initValue();
        this.initBind();

        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    initValue() {
        this.value = null;
        this.status = PENDING;
        this.reason = null;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];
    }

    // 因为测试文件使用了resolve(1)，所以要改变this作用域，让其指向Promise实例。否则会报this.status为undefined
    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.status = RESOLVE;
            this.value = value;
            this.onFulfilledCallback.forEach(fn => fn(this.value));  // 成功的回调
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.status = REJECT;
            this.reason = reason;
            this.onRejectedCallback.forEach(fn => fn(this.reason));   // 失败的回调
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = (value) => {
                return value;
            }
        }

        if (typeof onRejected !== 'function') {
            onRejected = (reason) => {
                throw (reason);
            }
        }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === PENDING) {
                this.onFulfilledCallback.push((value) => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(value);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    })
                });

                this.onRejectedCallback.push((reason) => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(reason);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    })
                });
            }

            if (this.status === RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }
        })

        return promise2;
    }
}
Promise.resolvePromise = function (newPromise, x, resolve, reject) {
    if (newPromise === x) {
        reject(new TypeError('Chaining cycle detected for promise'));
    }

    let called = false;
    if (x instanceof Promise) {
        x.then(value => {
            Promise.resolvePromise(newPromise, value, resolve, reject);
        }, reason => {
            reject(reason);
        })
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let { then } = x;
            if (typeof then === 'function') {
                then.call(
                    x,
                    value => {
                        if (called) return;
                        called = true;
                        Promise.resolvePromise(newPromise, value, resolve, reject);
                    }, reason => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    })
            } else {
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// 通过测试必须定义的
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise;