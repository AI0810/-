import React, { Component,lazy,Suspense} from 'react';
import { connect } from 'react-redux';
import { Layout, Menu,Breadcrumb } from 'antd';
import { getInfo } from '../../api/index';
import { NavLink, Route } from 'react-router-dom';
import { loginAction,menuAction } from '../../redux/actions/login';
import { filterMenu } from '../../utils/menuFilter';
import { asyncRouterMap } from '../../common/routerMap';
import store from '../../redux/store';
import Headers from '../../components/header/Index'

const { Header, Sider, Content } = Layout;
const {SubMenu} =Menu;
class Index extends Component {
  state={
    menuTree:[]
  }
  //创建异步路由
  renderRouter=(menu)=>{  //提供一个初始值，不参与运算
    let routerList = [];
    const asyncRoute=(data)=>{
      data.forEach((item)=>{
        if(item.children){
          asyncRoute(item.children)
        }else{
          routerList.push(
            <Route path={`/index${item.path}`} component={lazy(()=>import(`../../views${item.path}/Index.jsx`))} key={item.path}></Route>
          )
        }
      })
    }
    asyncRoute(menu);
    return routerList
  }
  renderMenu=(data)=>{
    // console.log('data',data)
    return data.map((item)=>{
      if(item.children){
        return <SubMenu title={item.meta.title} key={item.path}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path}>
        <NavLink to={`/index${item.path}`}>
          {item.meta.title}
        </NavLink>
        </Menu.Item>
    })
  }
  componentDidMount(){
    //判断用户是否刷新
    // const {menuReducer} = this.props.res
    if(this.props.res.menuReducer.length){
      //首次加载
      const menuTree=this.renderMenu(this.props.res.menuReducer);
      this.setState({
        menuTree
      })
    }else{
      //刷新
      getInfo().then(res=>{
        const {loginAction,menuAction} = this.props;
        //重新设置用户名和权限
        loginAction({role:res.data.role,nickname:res.data.nickname})
        //存储菜单数据
        
        menuAction(filterMenu(asyncRouterMap,res.data.role))
        //重新加载，因为上面是异步的，只能放在这里
        //console.log(33333,this.props)  拿不到this.props.res.menuReducer
        const menuTree=this.renderMenu(store.getState().menuReducer);//这里跟徐老师不一致
          this.setState({
            menuTree
          })
      })
    }  
  }
  

  render() {
    const {menuReducer} = this.props.res
    return (
      <div>
        
        <Layout style={{ height: '100vh' }}>
          <Sider style={{ background: '#001529' ,height:'100vh'}}>
            <h1 style={{textAlign:'center',color:'#fff',lineHeight:'50px',marginTop:'25px'}}>好学教育</h1>
            <Menu theme='dark'>
              {this.state.menuTree}
            </Menu>
          </Sider>
          <Layout style={{background:'#f4f4f4'}}>

            <Header style={{ color: '#fff' ,background:'#fff',textAlign:'right'}}>
              <Headers history={this.props.history}></Headers>
            </Header>
            
            <Suspense fallback={<div>loading...</div>}>
              <Content style={{padding:'20px'}}>
              <Breadcrumb className='mb'>
                <Breadcrumb.Item>学生信息</Breadcrumb.Item>
                <Breadcrumb.Item>考试管理</Breadcrumb.Item>
              </Breadcrumb>
                {this.renderRouter(menuReducer)}
              </Content>
            </Suspense>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({
    res:state
  }),
  {
    loginAction,
    menuAction
  }
)(Index)
