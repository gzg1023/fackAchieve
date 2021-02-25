// 观察者模式的 发布者
class Dep {
    constructor() {
        // 收集依赖对象
        this.subs = []
    }
    // 添加依赖对象
    addSub(sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 通知方法
    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}