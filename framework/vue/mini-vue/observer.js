class Observer {
    constructor(targetData) {
        this.walk(targetData)
    }
    // 遍历对象所有属性
    walk(targetData) {
        // 判断是否为对象
        if (!targetData || typeof targetData !== 'object') {
            return
        }
        // 遍历所有属性
        Object.keys(targetData).forEach(key => {
            this.defineReactive(targetData, key, targetData[key])
        })
    }

    // 定义响应式数据
    defineReactive(obj, key, value) {
        // 收集依赖，来统一更新
        let dep = new Dep()
        // 转化对象的内部属性
        this.walk(value)
        const _that = this
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            // 不返回obj[key]的原因是会递归触发
            get() {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if (newValue === value) return
                value = newValue
                // 处理普通值转为对象的情况
                _that.walk(newValue)
                // 发生通知
                dep.notify()
            }

        })
    }
}