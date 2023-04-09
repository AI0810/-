import { Col, Card, Row, Calendar, Badge,Avatar,List } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import style from './index.module.css'

class Index extends Component {
  state={
    data:[
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ]
  }
  time = () => {
    const date = new Date()
    const h = date.getHours()
    if (h <= 12) {
      return '上午好'
    } else if (h <= 13) {
      return '中午好'
    } else {
      return '晚上好'
    }
  }
  getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            type: 'warning',
            content: '王浩的妈妈约回访',
          },
          {
            type: 'success',
            content: '刘立签合同',
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: '还房贷',
          },
          {
            type: 'success',
            content: '去北京出差',
          },
          {
            type: 'error',
            content: '招聘新员工培训',
          },
        ];
        break;
      default:
    }
    return listData || [];
  }
  getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  dateCellRender = (value) => {
    const listDate = this.getListData(value);
    return (
      <ul className={style.events}>
        {listDate.map((item) => (<li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>))
        }
      </ul>
    )
  }
  monthCellRender = (value) => {
    const num = this.getMonthData(value);
    return num ? (
      <div className={style.notesMonth}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  render() {
    const { nickname } = this.props.res.loginReducer
    return (
      <div>
        <Card>
          <Row>
            <Col span={8}>
              <p className={style.welcome}>{this.time()}，{nickname}，准备吃点什么呢?</p>
              <p>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>
            </Col>
            <Col className={style.todo} span={8} offset={8}>
              <div className={style.line}>
                <span className={style.item}>转化学员数</span>
                <p className={style.count}>56</p>
              </div>
              <div className={style.line}>
                <span className={style.item}>团队排名</span>
                <p className={style.count}>5/23</p>
              </div>
              <div >
                <span className={style.item}>本月目标</span>
                <p className={style.count}>2,345</p>
              </div>
            </Col>
          </Row>
        </Card>
        <Card className='mt'>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className={style.headInfo}>
              <span>我的待办</span>
              <p>8个任务</p>
            </div>
            <div className={style.headInfo}>
              <span>本周任务平均处理时间</span>
              <p>30分钟</p>
            </div>
            <div className={style.headInfo}>
              <span>本周对接学员数</span>
              <p>33个</p>
            </div>
          </div>
        </Card>
        <Row className="mt" gutter={18}>
          <Col span={18}>
            <Card>
              <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
            </Card>

          </Col>
          <Col span={6}>
            <Card title="操作面板">
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作一
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作二
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作三
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作四
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作五
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作六
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作七
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                操作八
              </Card.Grid>
            </Card>
            <Card className='mt'>
              <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(
  state => ({
    res: state
  })
)(Index)
