import React, { Component } from 'react'
import { Card, Tabs, Row, Col, Timeline } from 'antd';
import { InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined, SmileOutlined } from '@ant-design/icons';
import style from './style.module.css'
import * as echarts from 'echarts';
export default class Index extends Component {
  state = {
    xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yData: [5, 20, 36, 10, 10, 20],
    xData1: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yData1: [5, 20, 36, 10, 10, 20]
  }
  componentDidMount() {
    this.drawBar()
    this.drawPie()
  }
  //绘制柱状图
  drawBar = () => {
    var myChart = echarts.init(this.myRef);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: this.state.xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: this.state.yData
        }
      ]
    }
    )
  }
  //绘制折线图
  drawLine = () => {
    var myChart = echarts.init(this.myRef2);
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: this.state.xData1
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '销量',
          type: 'line',
          data: this.state.yData1
        }
      ]
    }
    )
  }
  //绘制饼图
  drawPie=()=>{
    var myChart = echarts.init(this.salesRef);
    let option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "学科",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "语文" },
            { value: 735, name: "数学" },
            { value: 580, name: "英语" },
            { value: 484, name: "物理" },
            { value: 300, name: "化学" },
            { value: 400, name: "生物" },
          ],
        },
      ],
    };
    myChart.setOption(option);
  }
  callback = (activeKey) => {   //根本原因在于dom也在渲染、echarts也在渲染（更快一点）
    if (activeKey === "2") {
      //绘制折线图
      setTimeout(() => {
        this.drawLine()
      })

    }
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <div className={style.title}>
                <p>总销售额</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>￥ 1526,560 </p>
              <div className='mb mt'>
                <span>周同比 12%</span>
                <CaretUpOutlined style={{ color: '#008000', fontSize: '12px' }} />
                <span className='ml'>日同比 18%</span>
                <CaretDownOutlined style={{ color: '#ff0000', fontSize: '12px' }} />
              </div>
              <div className={style.day}>日销售额￥122,423</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <div className={style.title}>
                <p>访问量</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>1128 </p>
              <div className='mb mt'>
                <span>周同比 12%</span>
                <CaretUpOutlined style={{ color: '#008000', fontSize: '12px' }} />
                <span className='ml'>日同比 12%</span>
                <CaretDownOutlined style={{ color: '#ff0000', fontSize: '12px' }} />
              </div>
              <div className={style.day}>日均访问量 78</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <div className={style.title}>
                <p>支付笔数</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}>337</p>
              <div className='mb mt'>
                <span>周同比 3%</span>
                <CaretUpOutlined style={{ color: '#008000', fontSize: '12px' }} />
                <span className='ml'>日同比 12%</span>
                <CaretDownOutlined style={{ color: '#ff0000', fontSize: '12px' }} />
              </div>
              <div className={style.day}>转换率74%</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <div className={style.title}>
                <p>流失学员</p>
                <InfoCircleOutlined />
              </div>
              <p className={style.income}> 52 </p>
              <div className='mb mt'>
                <span>周同比 4%</span>
                <CaretUpOutlined style={{ color: '#ff0000', fontSize: '12px' }} />
                <span className='ml'>日同比 8%</span>
                <CaretDownOutlined style={{ color: '#ff0000', fontSize: '12px' }} />
              </div>
              <div className={style.day}>流失最多科目:英语</div>
            </Card>
          </Col>
        </Row>

        <Card className='mt'>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <Tabs.TabPane tab="销售额" key="1">
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef = a}></div>
                </Col>
                <Col span={8} >
                  <p className={style.rank}>校区销售额排名</p>
                  <ul>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')} >1</div>
                      <p>北京校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')}>2</div>
                      <p>深圳校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')}>3</div>
                      <p>杭州校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>4</div>
                      <p>青岛校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>5</div>
                      <p>长沙校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>6</div>
                      <p>南京校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>7</div>
                      <p>上海校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Tabs.TabPane>
            <Tabs.TabPane tab="访问量" key="2" forceRender={true}>    {/*因为切换的时候还没有这个组件-->*/}
              <Row>
                <Col span={16}>
                  <div className={style.panel} ref={a => this.myRef2 = a}></div>
                </Col>
                <Col span={8}>
                  <ul>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')} >1</div>
                      <p>北京校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')}>2</div>
                      <p>深圳校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={[style.num, style.top3].join(' ')}>3</div>
                      <p>杭州校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>4</div>
                      <p>青岛校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>5</div>
                      <p>长沙校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>6</div>
                      <p>南京校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                    <li className={style.item}>
                      <div className={style.num}>7</div>
                      <p>上海校区</p>
                      <p className={style.count}>321,223</p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Row gutter={16} className='mt'>
          <Col span={12}>
            <Card title="操作动态">
              <Timeline>
                <Timeline.Item color="green">
                  <p>王刚结算了一门课程</p>
                  <p>操作时间 2020-09-18</p>
                </Timeline.Item>
                <Timeline.Item color="red">
                  <p>李梦新增了一名学员</p>
                  <p>操作时间 2020-09-18</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>王丽审批了一笔订单</p>
                  <p>操作时间 2020-09-18</p>
                </Timeline.Item>
                <Timeline.Item color="gray">
                  <p>刘小浩登陆了系统</p>
                  <p>操作时间 2020-09-18</p>
                </Timeline.Item>
                <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
                  <p>王文登录了系统</p>
                  <p>操作时间 2020-09-18</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col span={12}>
            <Card title='销售额类别占比'>
              <div style={{height:'440px'}} ref={a=>this.salesRef=a}></div>
              {/*className={style.panel}*/}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
