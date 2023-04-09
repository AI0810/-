import React ,{Component} from 'react';
import {BrowserRouter as Router, Redirect, Route,Switch} from 'react-router-dom'
import './App.css';
import Login from './views/Login/Index'
import Home from './views/Layout/Index'
import { authLogin } from './utils/auth';

export default class App extends Component {
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' exact render={(props)=>{
              return <Redirect to='/index/home'></Redirect>
            }}></Route>

            <Route path='/index' render={(props)=>{
              //如果没有登录，就进入到登录页，如果登录了就进入首页
              if(!authLogin()){
                return <Redirect to='/login'></Redirect>
                // return <Login {...props}></Login>
              }
              
              return <Home {...props}></Home>
            }}></Route>

            <Route path='/login' render={(props)=>{
              //如果登录了
              if(authLogin()){
                return <Redirect to='/index/home'></Redirect>
              }
              return <Login {...props}></Login>
            }}></Route> 
          </Switch>
        </Router>
      </div>
    )
  }
}
