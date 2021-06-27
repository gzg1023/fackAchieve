/**
 * 匹配路由对象
 * @param {*} record 
 * @param {*} path 
 * 
 */
export default function createRoute(record, path) {
    const matched = []
    while (record) {
        // 使用unshift是因为先拿到子路由，父路由要排到前面
        matched.unshift(record)
        record = record.parentRecord
    }
    return {
        path,
        matched
    }
}