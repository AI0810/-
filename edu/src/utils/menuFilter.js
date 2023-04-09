export function filterMenu(data,role){
    return data.filter(item=>{                   //一级循环
        return item.meta.role.indexOf(role)!==-1
    }).map(item=>{
        if(item.children){
            item.children=filterMenu(item.children,role)
        }
        return item
    })
}