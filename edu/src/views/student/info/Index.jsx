import React, { Component } from 'react'
import { Card, Row, Col, Input, Form, Select, Button, Dropdown,Radio, Table,Pagination } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { studentList } from '../../../api/student';
export default class Index extends Component {
  state = {
    toggle: false,
    selectedRowKeys:[],
    data:[],
    total:0,
    formData:{},
    pageData:{
      page:1,
      pageSize:10,
    }
  }
  handleDropDown = () => {
    this.setState({
      toggle:!this.state.toggle
    })
  }
  selectChange=(selectedRowKeys)=>{
    this.setState({
      selectedRowKeys
    })
  }
  loadData=()=>{
    const {pageData,formData} = this.state
    studentList({...pageData,...formData}).then((res)=>{
      console.log(3333,res)
    })
  }
  search=()=>{
    this.loadData()
  }
  
  render() {
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
      },
      { title: "姓名", dataIndex: "name", key: "name", width: 80 },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 80,
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        width: 100,
      },
      { title: "科目", dataIndex: "subject", key: "4", width: 100 },
      {
        title: "班型",
        dataIndex: "type",
        key: "type",
        width: 100,
        
      },
      { title: "家长姓名", dataIndex: "parentname", key: "parentname", width: 100 },
      { title: "家长电话", dataIndex: "parenttel", key: "parenttel", width: 180 },
      {
        title: "班主任姓名",
        dataIndex: "classteacher",
        key: "classteacher",
        width: 120,
      },
      {
        title: "校区",
        dataIndex: "campus",
        key: "campus",
        width: 100,
        
      },
      {
        title: "剩余课时",
        dataIndex: "percent",
        key: "percent",
        width: 150,
      },
      { title: "已缴费用", dataIndex: "charge", key: "charge", width: 100 },
      {
        title: "课程有效期",
        dataIndex: "validperiod",
        key: "validperiod",
        width: 150,
      },
      { title: "课程顾问", dataIndex: "consultant", key: "consultant", width: 100 },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 150,
      },
    ];
    const menu = (<div>
    <Row className='mt' gutter={18} >
    <Col span={6}>
      <Form.Item
        label="班型"
        name="type"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
      >
        <Select
          options={[
            {
              value: '',//这个要看后端接口
              label: '全部',
            },
            {
              value: '1',//这个要看后端接口
              label: '一对一',
            },
            {
              value: '2',
              label: '小班',
            },
            {
              value: '3',
              label: '大班',
            },
            {
              value: '4',
              label: '精英班',
            },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item
        label="家长姓名："
        name="parent"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
      >
        <Input placeholder='请输入家长姓名' />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item
        label="班主任："
        name="headTeacher"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
      >
        <Input placeholder='请输入班主任姓名' />
      </Form.Item>
    </Col>
  </Row>
  </div>
  )
    const { toggle,selectedRowKeys,total,data } = this.state
    return (
      <div>
        <Card>
          <Form
            ref={a => this.formRef = a}
            name='basic'
            labelCol={{ span: 6 }}   //前面的文字占多少
            wrapperCol={{ span: 18 }}  //后面的输入框占多少
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="姓名"
                  name="name"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Input placeholder='请输入学生姓名' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="科目"
                  name="subject"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Select
                    options={[
                      {
                        value: '',//这个要看后端接口
                        label: '全部',
                      },
                      {
                        value: '语文',//这个要看后端接口
                        label: '语文',
                      },
                      {
                        value: '数学',
                        label: '数学',
                      },
                      {
                        value: '英语',
                        label: '英语',
                      },
                      {
                        value: '物理',
                        label: '物理',
                      },
                      {
                        value: '化学',
                        label: '化学',
                      },
                      {
                        value: '生物',
                        label: '生物',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="年级"
                  name="grade"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Select
                    options={[
                      {
                        value: '',//这个要看后端接口
                        label: '全部',
                      },
                      {
                        value: '一年级',//这个要看后端接口
                        label: '一年级',
                      },
                      {
                        value: '二年级',
                        label: '二年级',
                      },
                      {
                        value: '三年级',
                        label: '三年级',
                      },
                      {
                        value: '四年级',
                        label: '四年级',
                      },
                      {
                        value: '五年级',
                        label: '五年级',
                      },
                      {
                        value: '六年级',
                        label: '六年级',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Dropdown overlay={menu} trigger={['click']} onClick={this.handleDropDown}>
                  <a onClick={e=>e.preventDefault()}>
                    {toggle ? '收起':'展开' }
                    {toggle ?  <UpOutlined />:<DownOutlined /> }
                  </a>
                </Dropdown>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={this.search}>搜索</Button>
                <Button className='ml'>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
          <Radio.Group defaultValue="">
            <Radio.Button value=''>全部</Radio.Button>
            <Radio.Button value='1'>中心校区</Radio.Button>
            <Radio.Button value='2'>顺义校区</Radio.Button>
            <Radio.Button value='3'>大兴校区</Radio.Button>
            <Radio.Button value='4'>昌平校区</Radio.Button>
          </Radio.Group>
        </Card>
        <Card className='mt'>
        <Table 
            columns={columns} 
            dataSource={data}
            rowKey={(record)=>record.id}
            pagination={false}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys:selectedRowKeys,
              onChange:this.selectChange
            }}
            />
            <Pagination 
            size='small' 
            total={total}  
            showSizeChanger 
            showQuickJumper />
        </Card>
      </div>
    )
  }
}
