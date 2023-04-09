import React, { Component } from 'react'
import style from './index.module.css'
import { Card, Tabs, Button, Form, Input, message } from 'antd'
import { loginAction,menuAction } from '../../redux/actions/login'
import { connect } from 'react-redux'
import {login,register} from '../../api'
import {asyncRouterMap} from '../../common/routerMap'
import {filterMenu} from '../../utils/menuFilter'
class Index extends Component {
  login=()=>{
    const {loginAction,menuAction,history} = this.props;
    this.formRef.validateFields().then(res=>{
      //表单校验通过
      login(res).then(res=>{
        
        //存储token
        sessionStorage.setItem('token',res.token)
        //用户权限和昵称  刷新就丢
        loginAction({
          role:res.role,
          nickname:res.nickname
        })
        //直接筛选出每个角色所对应的菜单项,并且加入到redux里
        menuAction(filterMenu(asyncRouterMap,res.role))
        //跳转   一开始重定向有点问题
        history.push('/index/home')
      }).catch(err=>{
        console.log('请求拦截器的',err)
      })
    }).catch(err=>{
      //表单校验不通过
      console.log(err)
    })
  }
  handleRegister=()=>{
    this.formRef2.validateFields().then(res=>{
      register(res).then(data=>{
        if(data.code === 0){
          message.success(data.msg)
        }
      })
    })
  }
  render() {
    return (
      <div className={style.wrap}>
        <Card
          title="好学教育后台管理系统"
          headStyle={{ textAlign: 'center' }}
          style={{ width: 500 }}
          bordered={false}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="手机号密码登陆" key="1">
              <Form
                ref={(a)=>this.formRef=a}
                name="basic"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '账号不能为空',
                    },
                    {
                      pattern:/^\w{4,8}$/,message:'账号要求是4-8位数字字母组合'
                    }
                  ]}
                >
                  <Input placeholder='请输入您的账号'/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '密码不能为空',
                    },
                  ]}
                >
                  <Input.Password placeholder='请输入您的密码'/>
                </Form.Item>                
                <Button type='primary' style={{width:'100%'}} onClick={this.login}>立即登录</Button>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="新用户注册" key="2">
              <Form
                ref={a=>this.formRef2=a}
                name="basic"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '账号不能为空',
                    },
                    {
                      pattern:/^\w{4,8}$/,message:'账号要求是4-8位数字字母组合'
                    }
                  ]}
                >
                  <Input placeholder='请输入您的手机号'/>
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '密码不能为空',
                    },
                  ]}
                >
                  <Input.Password placeholder='请输入您的密码'/>
                </Form.Item> 
                <Form.Item
                  name="nickname"
                  rules={[
                    {
                      required: true,
                      message: '账号不能为空',
                    }
                  ]}
                >
                  <Input placeholder='请输入您的姓名'/>
                </Form.Item>               
                <Button 
                type='primary' 
                style={{width:'100%'}} 
                onClick={this.handleRegister}
                >立即登录</Button>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
export default connect(
  state=>({
    res:state
  }),
  {
    loginAction,
    menuAction
  }
)(Index)