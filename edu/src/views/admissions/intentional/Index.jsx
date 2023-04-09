import React, { Component } from 'react'
import {Form,Button,Col,Row,Card,Input, Table,Tag,Badge} from 'antd'
import { getStudentList } from '../../../api/student'

export default class Index extends Component {

  state={
    selectedRowKeys:[],
    data:[],
  }
  onSelectChange=(res)=>{
    console.log(res)
  }
  componentDidMount(){
    getStudentList().then((res)=>{
      console.log(res)
      this.setState({
        data:res.data
      })
    })
  }
  render() {
    const columns = [
      {
        title: "序号",
        dataIndex:'index',
        key:'index',
        align:'center',
        render: (text, record, index) => index+1,
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        align:'center'
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        render:(text)=>text===1?'男':'女'
      },
      {
        title: "客户状态",
        dataIndex: "status",
        key: "status",
        align:'center',
        render: (text,record,index) => {
          // const textList=[];
          // textList.push(text)
          if(text===1){
            return (
              <Tag color='#87d068' key={index}>
                {'转化成功'}
              </Tag>
            )
          }else if(text===2){
              return (
                <Tag color='#108ee9' key={index}>
                  {'待转化'}
                </Tag>
              )
          }else{
            return (
              <Tag color='#f50' key={index}>
                {'转化失败'}
              </Tag>
            )
          }
        }
      },
      {
        title: "试听状态",
        key: "audition",
        dataIndex: "audition",
        align:'center',
        render:(text,record,index)=>{
          if(text===1){
            return(
              <span>
            <Badge status="success" />
            已转试听
            </span>
            )
          }else{
            return(
              <span>
            <Badge status='default' />
            未转试听
            </span>
            )
          }
        }
      },
      {
        title: "招生来源",
        key: "source",
        dataIndex: "source",
        align:'center',
      },
      {
        title: "手机号码",
        dataIndex: "tel",
        key: "tel",
        align:'center',
      },
      {
        title: "年级",
        dataIndex: "grade",
        key: "grade",
        align:'center',
      },
      {
        title: "意向级别",
        dataIndex: "level",
        key: "level",
        align:'center',
      },
      {
        title: "主负责任人",
        dataIndex: "principal",
        key: "principal",
        align:'center',
      },
      {
        title: "详情",
        align:'center',
        dataIndex:'operate',
        key:'operate',
        render:()=>{
          return <div>
              <Button type='primary' size='small'>详情</Button>
          </div>
        },
        width:150,
      },
    ];
    const {selectedRowKeys,data} = this.state
    return (
      <div>
        <Card>
          <Form
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
                  <Input placeholder="请输入教师姓名"/>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="负责人"
                  name="subject"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Input placeholder="请输入负责人姓名"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type='primary'>查询</Button>
                <Button className='ml'>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
              <Button type='primary'>新增</Button>
              <Button type="danger" className='ml'>删除</Button>
              <Button type='primary' className='ml'>转化为正式学员</Button>
              <Button type='primary' className='ml'>取消转化</Button>
        </Card>
        <Card className='mt'> 
        <Table 
            columns={columns} 
            dataSource={data}
            rowKey={(record)=>record.id}
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys:selectedRowKeys,
              onChange:this.selectChange
            }}
            >
              <span ></span>
            </Table>
        </Card>
      </div>
    )
  }
}
