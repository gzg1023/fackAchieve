// 解析routers,生成路由表
export default function createRouteMap(routes, pathList, pathMap) {
    // 路由路径表
    pathList = pathList ?? []
    // 路径映射表
    pathMap = pathMap ?? {}

    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap)
    });

    return {
        pathList,
        pathMap
    }
}

function addRouteRecord(route, pathList, pathMap, parentRecord) {
    // 处理父子路由
    let path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path
    let record = {
        path: path,
        component: route.component,
        parentRecord: parentRecord
    }
    // 如果不存在则添加
    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = record
    }
    // 处理子路由
    if (route.children) {
        route.children.forEach((subRoute) => {
            addRouteRecord(subRoute, pathList, pathMap, record)
        })
    }
}