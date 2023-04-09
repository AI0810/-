import React, { Component } from 'react'
import { Card, Row, Col, Statistic, List, Avatar, message, Modal, Form, Input, Select,DatePicker } from 'antd'
import moment from 'moment'
import { getClassList, deleteClass, addClass } from '../../api/class'
import style from './style.module.css'
export default class Index extends Component {
  state = {
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F21%2F20150921173512_PehaH.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632629214&t=9306e40f281e43dc65e80566c3bc8bd3',
    dataSource: [],
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
    form: {
      classroom: "",
      teacher: "",
      subject: "",
      time: "",
      type: 1,
    },
    visible: false,
  }
  onFinish = () => {
    console.log('finished!')
  }

  loadData = () => {
    getClassList().then(res => {
      this.setState({
        dataSource: res.data,
      })
    })
  }
  classType = (num) => {
    if (num === "1") {
      return '一对一'
    } else if (num === "2") {
      return '小班'
    } else if (num === "3") {
      return '大班'
    } else {
      return '精英班'
    }
  }
  add = () => {
    let {visible,form} = this.state
    visible = true
    form = {
      classroom: "",
      teacher: "",
      subject: "",
      time: "",
      type: "1",
    }
    this.setState({
      visible,
      form
    })
    
  }
  //删除排课
  deletes = (id) => {
    deleteClass({ id }).then(res => {
      message.success(res.msg);
      this.loadData()
    })
  }
  //modal中确定
  handleOk = () => {
    this.formRef.validateFields().then(res => {
      // console.log(res)
       const time=moment(res.time).format('YYYY-MM-DD HH:mm:ss') //日期对象不能直接传给后端，需要转为字符串或时间戳
      addClass({...res,time}).then(data=>{
        if(data.code===0){
          message.success(data.msg)
          this.state.visible = false
          this.formRef.resetFields()
          this.loadData()
        }
      })
       // fn.then(data=>{
      //     if(data.code===0){
      //         message.success(data.msg);
      //         //隐藏弹窗
      //         this.props.changeVisible(false);
      //         //清空表单数据
      //         this.formRef.resetFields();
      //         //调用父组件方法刷新数据
      //         this.loadData()
      //     }
      // })
    })
  }
  //modal中取消
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.loadData()
  }
  render() {
    const { Countdown } = Statistic
    const { deadline, dataSource, avatar, visible } = this.state
    return (
      <div>
        <Card>
          <Row>
            <Col span={8}>
              <Countdown title="模拟考倒计时" value={deadline} onFinish={this.onFinish} />
            </Col>
            <Col span={8}>
              <Countdown title="测评日" value={deadline} format="HH:mm:ss:SSS" />
            </Col>
            <Col span={8}>
              <Countdown title="中考倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
            </Col>
          </Row>
        </Card>
        <div className='mt'>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item>
                <div>
                  <Card hoverable>
                    <div style={{ marginBottom: '3px' }}>
                      教室：{item.classroom}
                      <span style={{ float: "right", color: '#666' }}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <Avatar src={avatar} className={style.cardAvatar} size='large' />
                    <div className={style.metaContent}>
                      <p>老师：{item.teacher}</p>
                      <p>学科：{item.subject}</p>
                      <p>班型：{this.classType(item.type)}</p>
                    </div>
                    <a onClick={this.add}>新增排课</a>
                    <a onClick={() => this.deletes(item.id)} style={{float:"right"}}>删除排课</a>
                  </Card>
                </div>
              </List.Item>
            )}>
          </List>
        </div>

        <Modal title="新增排课" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form
            name='basic'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            ref={a => this.formRef = a}
          >
            <Form.Item
              label='教室'
              name='classroom'
              rules={[
                { required: true, message: '不能为空' }
              ]}
            >
              <Input placeholder='如A教101室' />
            </Form.Item>
            <Form.Item
              label='老师'
              name='teacher'
              rules={
                [
                  { required: true, message: '不能为空' }
                ]
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='学科'
              name='subject'
              rules={
                [
                  { required: true, message: '不能为空' }
                ]
              }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='上课时间'
              name='time'
              rules={
                [
                  { required: true, message: '不能为空' }
                ]
              }
            >
              <DatePicker style={{width:'100%'}}/>
            </Form.Item>
            <Form.Item
              label='班型'
              name='type'
              rules={
                [
                  { required: true, message: '不能为空' }
                ]
              }
            >
              <Select
                options={[
                  {
                    value: 1,
                    label: '一对一',
                  },
                  {
                    value: 2,
                    label: '小班',
                  },
                  {
                    value: 3,
                    label: '大班',
                  },
                  {
                    value: 4,
                    label: '精英班',
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>

      </div>
    )
  }
}
