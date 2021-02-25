class Vue {
    constructor(options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        // 如果是字符串就说明是选择器
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把data的成员转化为getter和setter注入到vue实例
        this._proxyData(this.$data)
        // 3. 调用observer对象，把data属性转化为响应式数据，监听数据的变化
        new Observer(this.$data)
        // 4. 调用Compiler对象，处理模版编译
        new Compiler(this)
    }

    _proxyData(data) {
        // 遍历对象
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) return
                    data[key] = newValue
                }

            })
        })
    }
}