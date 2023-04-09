import request from '../utils/request'
//登陆接口
export function login(data){
    return request({
        url:'/user/login',
        method:'post',
        data
    })
}
//根据token获取用户权限
export function getInfo(){
    return request({
        url:'/user/getInfo',
        method:'get',
    })
}

//注册接口
export function register(data) {
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  }