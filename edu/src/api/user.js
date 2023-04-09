import request from '../utils/request'
//获取登录信息
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
//获取注册信息
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
//根据token获取用户权限
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}
//获取用户列表
export function getUserList(data) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    data
  })
}
//修改用户权限
export function changeRole(data) {
  return request({
    url: '/user/changeRole',
    method: 'post',
    data
  })
}