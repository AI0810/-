import React, { Component } from 'react'
import { Row, Col, Button, Table, Card, Modal, Descriptions, Radio, Badge, Form,message } from 'antd'
import { getUserList, changeRole } from '../../api/user'
export default class Index extends Component {
  state = {
    visible: false,
    value: 'admin',
    data: [], 
    role:'',
    id:1,
  }
  componentDidMount(){
    this.loadData()
  }
  changeVisible=(visible)=>{
    this.setState({
      visible
    })
  }
  loadData = () => {
    getUserList().then(res => {
      this.setState({
        data:res.data
      })
    })
  }
  handleOk = () => {
    this.formRef.validateFields().then(res=>{
      const {id} = this.state
      changeRole({role:res.setRole,id}).then((data)=>{
        if(data.code===0){
          message.success(data.msg);
          //隐藏弹窗
          this.changeVisible(false);
          //清空表单数据
          this.formRef.resetFields();
          //调用父组件方法刷新数据
          this.loadData()
      }
      }) 
    })   
  }
  handleCancel = () => {
    this.changeVisible(false)
  }
  edit = (record) => {
    this.changeVisible(true)
    this.setState({
      id:record.id,
      role:record.role
    })
  }
  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
        render: (text, record, index) => index + 1,
      },
      {
        title: "手机号",
        dataIndex: "username",
        key: "username",
        align: "center",
      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
        align: "center",
      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "setRole",
        key: "setRole",
        align: "center",
        render: (text, record) => {
          return <div>
            <Button type='primary' size='small' onClick={() => this.edit(record)}>设置权限</Button>
          </div>
        },
      },
    ]
    const { visible, value, data } = this.state
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="员工信息">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={(record) => record.id}
              >
              </Table>
            </Card>
          </Col>
          <Col span={12}>
            <Card title>
              <Descriptions bordered>
                <Descriptions.Item label="销售冠军">王明军</Descriptions.Item>
                <Descriptions.Item label="课时冠军">肖琪琪</Descriptions.Item>
                <Descriptions.Item label="金牌咨询师">郭诗云</Descriptions.Item>
                <Descriptions.Item label="统计起始时间">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="统计截至时间" span={2}>
                  2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="本月盈亏" span={3}>
                  <Badge status="processing" text="盈利320万" />
                </Descriptions.Item>
                <Descriptions.Item label="收益科目">数学</Descriptions.Item>
                <Descriptions.Item label="较差科目">语文</Descriptions.Item>
                <Descriptions.Item label="进步科目">数学</Descriptions.Item>
                <Descriptions.Item label="备注">
                  综合趋势有所下降，主要受国家政策影响，老师离职率较高，需要管控人员走动，
                  数学是主要盈利科目，英语报名人数较少，英语老师有空闲，排班不满的情况
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
        <Modal
          title="权限设置"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
          name='basic'
          ref={a=>this.formRef=a}
          >
            <Form.Item
              name='setRole'
            >
              <Radio.Group>
                <Radio value="admin">管理员/老板</Radio>
                <Radio value="teacher">老师/咨询师</Radio>
                <Radio value="manager">部门经理</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
