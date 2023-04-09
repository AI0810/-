import React, { Component } from 'react'
import { Card,Button,Row,Col, Steps } from 'antd'
export default class Index extends Component {
  back=()=>{
    const {history} = this.props
    history.push('/index/admissions/intentional')
  }
  render() {
    const {Step} = Steps
    return (
      <div>
        <Card className="mt" style={{textAlign:'right'}}>
          <Button type='primary' onClick={this.back}>返回</Button>
        </Card>
        <Card className='mt'>
          <Row>
            <Col><h3>家长信息</h3></Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>姓名:陈艳</span>
          </Col>
          <Col span={6}>
            <span>电话:15789887654</span>
          </Col>
          <Col span={6}>
            <span>家庭住址:北京市朝阳区</span>
          </Col>
          <Col span={6}>
            <span>咨询课程:三年级数学</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>年龄:37</span>
          </Col>
          <Col span={6}>
            <span>文化程度:本科</span>
          </Col>
          <Col span={6}>
            <span>关系:母亲</span>
          </Col>
          <Col span={6}>
            <span>意向程度:2</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>满意因素：环境好，老师素质高</span>
          </Col>
          <Col span={6}>
            <span>不满意因素：费用贵</span>
          </Col>
          <Col span={6}>
            <span>其他意向机构：学而思</span>
          </Col>
          <Col span={6}>
            <span>备注：再考虑一下，预计一星期内回复</span>
          </Col>
          </Row>
        </Card>
        <Card className='mt'>
        <Row>
            <Col><h3>学生信息</h3></Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>姓名:罗梦雨</span>
          </Col>
          <Col span={6}>
            <span>性别：女</span>
          </Col>
          <Col span={6}>
            <span>年龄：10</span>
          </Col>
          <Col span={6}>
            <span>年级：三年级</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>学校：育才小学</span>
          </Col>
          <Col span={6}>
            <span>班级排名</span>
          </Col>
          <Col span={6}>
            <span>弱势学科：数学</span>
          </Col>
          <Col span={6}>
            <span>优劣势：活泼好动，注意力不集中，有不认真的习惯</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>语文成绩：87</span>
          </Col>
          <Col span={6}>
            <span>数学成绩：45</span>
          </Col>
          <Col span={6}>
            <span>英语成绩：82</span>
          </Col>
          <Col span={6}>
            <span>备注：数学比较偏科，语文英语不够拔尖</span>
          </Col>
          </Row>
        </Card>
        <Card className='mt'>
          <Row>
            <Col><h3>课程咨询师信息</h3></Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>姓名:徐光华</span>
          </Col>
          <Col span={6}>
            <span>工号:2018070633</span>
          </Col>
          <Col span={6}>
            <span>职位：课程咨询师</span>
          </Col>
          <Col span={6}>
            <span>电话：16654392929</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>沟通时间：2小时</span>
          </Col>
          <Col span={6}>
            <span>服务态度：很好</span>
          </Col>
          <Col span={6}>
            <span>月单量：27</span>
          </Col>
          <Col span={6}>
            <span>客户投诉：无</span>
          </Col>
          </Row>
          <Row className='mt'>
          <Col span={6}>
            <span>所属校区：中心校区</span>
          </Col>
          <Col span={6}>
            <span>入职年限：两年</span>
          </Col>
          </Row>
          <Card className='mt'>
            <Steps current={2}>
              <Step title='报名咨询' description='线上对接预约'></Step>
              <Step title='门店咨询' description='课程顾问李老师接待'></Step>
              <Step title='办理入学' description='安排校区及开课时间'></Step>
              <Step title='开课' description='安排班级'></Step>
            </Steps>
          </Card>
        </Card>
      </div>
    )
  }
}
