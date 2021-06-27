export default {
    name: 'routerLink',
    props: {
        to: {
            type: String,
            require: true
        }
    },
    render(h) {
        return h('a',
            {
                attrs: {
                    href: this.$router.mode === 'hash' ? `#${this.to}` : `${this.to}`
                }
            }, this.$slots.default)
    }
}