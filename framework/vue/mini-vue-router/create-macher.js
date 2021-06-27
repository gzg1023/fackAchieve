import createRouteMap from "./create-route-map";
import createRoute from "./util/route";
export default function createMacher(routes) {
    const { pathList, pathMap } = createRouteMap(routes)

    // 匹配路由的函数,通过路径拿到组件
    function match(path) {
        const record = pathMap[path]
        if(record){
            return createRoute(record,path)
        }
        return createRoute(null,path)
    }
    // 动态添加路由
    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap)
    }
    return{
        match,
        addRoutes
    }
}