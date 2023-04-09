import React, { Component } from 'react'
import { Card, Form, Input, Row, Col,Select, Button,Table,Pagination,message} from 'antd'
import { getTeacherList,deletes,batchDelete } from '../../api/teacher'
import AddModal from './AddModal'
import moment from 'moment';

export default class Index extends Component {
  formRef = React.createRef()
  state={
    disabled:true,
    data:[],
    pageData:{
      page:1,
      pageSize:10
    },
    loading:false,
    visible:false,
    total:0,
    formData:{},
    record:{},
    title:'',
    selectedRowKeys:[]
  }
  componentDidMount(){
    this.loadData()
  }
  edit=(record)=>{
    this.setState({   //又是异步导致的错误
      record,
      visible:true,
      title:'编辑教师'
    },function(){
      this.myRef.formRef.setFieldsValue({
        ...record,
        birth:moment(record.birth),
        date:moment(record.date)
      })
    })
  }
  loadData=()=>{
    this.setState({
      loading:true
    })
    const {pageData,formData} = this.state
    getTeacherList({...pageData,...formData}).then(res=>{
      this.setState({
        data:res.data,
        loading:false,
        total:res.total,
        disabled:true,
      })
    })
  }
  
  search=()=>{
    const formData=this.formRef.current.getFieldsValue(true);  //只有你点了搜索才会获取表单数据
    this.setState({
      formData
    },function(){          //异步问题，写回调
      this.loadData()
    })
    
  }
  reset=()=>{
    //清空表单数据
    this.formRef.current.resetFields()
    //重置一下分页功能
    this.setState({
      pageData:{
        page:1,
        pageSize:10,
      },
      formData:{}
    },function(){
      this.loadData()
    })
    
  }
  showModal=()=>{
    this.setState({
      visible:true,
      title:'新建教师'
    })
    this.myRef.formRef.resetFields()
  }
  changeVisible=(visible)=>{
    this.setState({
      visible
    })
  }
  pageChange=(page,pageSize)=>{
    this.setState({   //这个有异步，回调
      pageData:{
        page,
        pageSize
      }
    },function(){
      this.loadData()
    })
  }
  deletes=(id)=>{
    deletes({id}).then(res=>{
      if(res.code===0){
        message.success(res.msg);
        //更新数据
        this.loadData()
    }
    })
  }
  selectChange=(selectedRowKeys)=>{
    this.setState({
      selectedRowKeys,
      disabled:selectedRowKeys.length?false:true
    })
    console.log(selectedRowKeys)
  }
  batchDelete=()=>{
    batchDelete({ids:this.state.selectedRowKeys}).then(res=>{
      if(res.code===0){
        message.success(res.msg);
        //更新数据
        this.loadData()
      }
    })
  }
  render() {
    const columns =[
      {
        title:'序号',
        dataIndex:'index',//后端按照名字给你一一对应上   看接口文档
        key:'index',
        align:'center',
        render:(text,record,index)=>index+1,     //text表示这个单元格的数据  record代表一整行的数据 index代表序号
        width:60,
      },
      {
        title:'姓名',
        dataIndex:'name',//后端按照名字给你一一对应上   看接口文档
        key:'name',
        align:'center',
        width:60,
      },
      {
        title:'性别',
        dataIndex:'gender',
        key:'gender',
        align:'center',
        render:(text)=>text==1?'男':'女',
        width:60,
      },
      {
        title:'级别',
        dataIndex:'level',
        key:'level',
        align:'center',
        render:(text)=>{
          if(text==1){
            return '初级教师'  //必须要return
          }else if(text==2){
            return '中级教师'
          }else if(text==3){
            return '高级教师'
          }else{
            return '特级教师'
          }
        }
      },
      {
        title:'年级',
        dataIndex:'grade',
        key:'grade',
        align:'center',
        width:80,
      },
      {
        title:'科目',
        dataIndex:'subject',
        key:'subject',
        align:'center',
      },
      {
        title:'入职日期',
        dataIndex:'date',
        key:'date',
        align:'center',
      },
      {
        title:'类型',
        dataIndex:'type',
        key:'type',
        align:'center',
        render:(text)=>text==1?'全职':'兼职',
        width:80,
      },
      {
        title:'手机号码',
        dataIndex:'tel',
        key:'tel',
        align:'center',
      },
      {
        title:'毕业院校',
        dataIndex:'school',
        key:'school',
        align:'center',
      },
      {
        title:'家庭住址',
        dataIndex:'address',
        key:'address',
        align:'center',
      },
      {
        title:'出生年月',
        dataIndex:'birth',
        key:'birth',
        align:'center',
      },
      {
        title:'学历',
        dataIndex:'education',
        key:'education',
        align:'center',
        width:60,
      },
      {
        title:'操作',
        dataIndex:'operation',
        key:'operation',
        fixed:'right',
        align:'center',
        render:(text,record)=>{
          return <div>
              <Button type='primary' size='small' onClick={()=>this.edit(record)}>编辑</Button>
              <Button danger size='small' className='ml' onClick={()=>this.deletes(record.id)}>删除</Button>
          </div>
        },
        width:150,
      },
    ]

    const {disabled,data,loading,visible,total,record,title,selectedRowKeys} = this.state
    console.log('1111',total)
    return (
      <div>
        <Card>
          <Form
            ref={this.formRef}
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
                  <Input />
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
                  label="手机号"
                  name="tel"//这个是由后端规定的，一般接口文档会写，最好一致，发给后端取数据的
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={this.search}>搜索</Button>
                <Button className='ml' onClick={this.reset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className='mt'>
          <Button type='primary' onClick={this.showModal}>新建员工</Button>
          <Button danger disabled={disabled} className='ml' onClick={this.batchDelete}>批量删除</Button>
        </Card>
        <Card className='mt'>
          <Table 
            columns={columns} 
            dataSource={data}
            scroll={{x:1400}}
            rowKey={(record)=>record.id}
            loading={loading}
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
            showQuickJumper 
            onChange={this.pageChange}/>
        </Card>
        <AddModal 
        ref={a=>this.myRef=a}
        visible={visible}
        changeVisible={this.changeVisible}
        reload={this.loadData}
        record={record}
        title = {title}
        />
      </div>
    )
  }
}
