class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compiler(this.el)
    }
    // 编译模版，处理各种节点
    compiler(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach((node) => {
            if (this.isTextNode(node)) {
                // 处理文本
                this.compilerText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素
                this.compilerElement(node)
            }
            // 处理多层节点
            if (node.childNodes && node.childNodes.length !== 0) {
                this.compiler(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compilerElement(node) {
        Array.from(node.attributes).forEach((attr) => {
            let attrName = attr.name
            // 判断是否为指令
            if (this.isDirective(attrName)) {
                // 转化指令 
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    // 编译文本节点，处理差值表达式 
    compilerText(node) {
        let reg = /\{\{(.+?)}\}/
        let content = node.textContent
        if (reg.test(content)) {
            // 获取正则匹配的第一个内容
            let key = RegExp.$1.trim()
            node.textContent = content.replace(reg, this.vm[key])
            // 触发依赖
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断元素是否为指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断元素是否为文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断元素是否为元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
    // 更新指令数据
    update(node, key, attrName) {
        let updateFn
        if (attrName.indexOf(':') !== -1) {
            attrName = attrName.substr(3)
            updateFn = this.onUpdater
            updateFn && updateFn.call(this, node, key, this.vm[key], attrName)
        } else {
            updateFn = this[attrName + 'Updater']
            // 此处的this的Compiler对象
            updateFn && updateFn.call(this, node, key, this.vm[key])
        }

    }
    // 处理v-text指令
    textUpdater(node, key, value) {
        // 文本节点的值用textContent
        node.textContent = value
        // 收集依赖
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // 处理v-model指令
    modelUpdater(node, key, value) {
        // 表单的值是value
        node.value = value
        // 收集依赖
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener('input', (e) => {
            console.log(e)
            this.vm[key] = node.value
        })
    }

    // 处理v-show
    showUpdater(node, key, value) {
        if (value) {
            node.style.display = 'block'
        } else {
            node.style.display = 'none'
        }
        new Watcher(this.vm, key, (newValue) => {
            node.style.display = newValue ? 'block' : 'none'
        })

    }
    // 处理v-on
    onUpdater(node, key, value, handleType) {
        // value = value.substr(2)
        console.log("🚀 onUpdater", node, key, value)
        node.addEventListener(handleType, (e) => {
            this.vm[key]()
        })
    }
}