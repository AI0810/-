import request from '../utils/request'
export function getClassList() {
    return request({
        url: '/class/classList',
        method: 'post',
    })
}
//删除排课
export function deleteClass(data) {
    return request({
        url: '/class/deleteClass',
        method: 'post',
        data
    })
}

//新增排课
export function addClass(data) {
    return request({
        url: '/class/addClass',
        method: 'post',
        data
    })
}