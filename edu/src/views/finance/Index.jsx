import React, { Component } from 'react'
import {Result,Button} from 'antd'
export default class Index extends Component {
  render() {
    return (
      <div>
        <Result 
        status='success' 
        title="Successfully Purchased Cloud Server ECS!"
        sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        >
          <Button type='primary'> Go Console</Button>
          <Button className='ml'> Buy Again</Button>
        </Result>
      </div>
    )
  }
}
