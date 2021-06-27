export default {
    name: 'routerView',
    render(h) {
        const route = this.$route
        let depth = 0;
        this.isRouterVirw = true
        let parent = this.$parent
        while (parent) {
            if(parent.isRouterVirw){
                depth ++
            }
            parent = parent.$parent 
        }
        const record = route.matched[depth]
        if(record){
            return h(record.component)
        }
        return h()
    }
}