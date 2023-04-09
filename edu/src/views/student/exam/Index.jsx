import React, { Component } from 'react'
import { Card,Row,Col,Form,DatePicker,Input,Select,Button,Table,Pagination } from 'antd'
import moment from 'moment/moment';
import { examList } from '../../../api/student';
export default class Index extends Component {
  state={
    data:[],
    total:0,
    formData:{},
    pageData:{
      page:1,
      pageSize:10,
    }
  }
  componentDidMount(){
    this.loadData()
  }
  loadData=()=>{
    const {pageData,formData} = this.state
    examList({...pageData,...formData}).then(res=>{
      this.setState({
        data:res.data,
        total:res.total,
      })
      console.log(res)
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
        render:(text,record,index)=>index+1
      },
      { title: "姓名", dataIndex: "name", key: "name", align: "center",width: 80 },
      {
        title: "类别",
        dataIndex: "type",
        key: "type",
        width: 80,
        align: "center",
      },
      {
        title: "考试时间",
        dataIndex: "date",
        key: "date",
        width: 100,
        align: "center",
        render:(text)=>{
          return moment(text).format('YYYY-MM-DD')
        }
      },
      { title: "科目", dataIndex: "subject", key: "subject", align: "center",width: 100 },
      {
        title: "成绩发布时间",
        dataIndex: "publishTime",
        key: "publishTime",
        width: 100,
        align: "center",
        render:(text)=>{
          return moment(text).format('YYYY-MM-DD')
        }
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        align: "center",
        width: 120,
      },
      {
        title: "参与班级",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        width: 100,
      } 
    ];
    const {total,data} = this.state
    const {RangePicker} = DatePicker
    return (
      <div>
        <Card>
            <Form
            ref={a=>this.formRef=a}
            name='basic'
            labelCol={{ span: 6 }}   //前面的文字占多少
            wrapperCol={{ span: 18 }}  //后面的输入框占多少
          >
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="考试名称"
                  name="exam"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="考试类别："
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
                        label: '摸底考试',
                      },
                      {
                        value: '2',
                        label: '随堂测验',
                      },
                      {
                        value: '3',
                        label: '期中考试',
                      },
                      {
                        value: '4',
                        label: '期末考试',
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item
                  label="考试日期"
                  name="date"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <RangePicker showTime />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={this.search}>查询</Button>
                <Button className='ml' onClick={this.reset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
        <Table 
            columns={columns} 
            dataSource={data}
            rowKey={(record)=>record.id}
            pagination={false}
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
