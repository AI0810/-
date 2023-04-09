import request from '../utils/request'

//获取意向学生列表
export function getStudentList(){
    return request({
        url:'/student/studentList',
        method:'post',
    })
}

//正式学员列表
export function studentList(data){
    return request({
        url:'/student/formalStudents',
        method: 'post',
        data
    })
}

//删除学员
export function deleteStudent(data) {
    return request({
        url: '/student/deleteStudent',
        method: 'post',
        data
    })
}

//考试列表
export function examList(data) {
    return request({
        url: '/student/exam',
        method: 'post',
        data
    })
}