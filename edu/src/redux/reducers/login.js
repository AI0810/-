const initState = {role:"",nickname:""};
export function loginReducer(prevState=initState,action){
    // console.log('action',action)
    const {type,payload} = action
    if(type==='add'){
        console.log('reducer',payload)
        return payload
    }
    return prevState//他会自动执行一次，没有的话返回初始值
}
const menu = []
export function menuReducer(prevState=menu,action){
    const {type,payload} = action
    if(type==='generate'){
        return payload
    }
    return prevState//他会自动执行一次，没有的话返回初始值
}