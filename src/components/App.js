import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import SetPwd from './SetPwd'
import Profile from './Profile'
import Search from './Search'
import Home from './Home'
import ChangePwd from './ChangePwd'
import Edit from './Edit'
import Verify from './Verify'
import Post from './Post'
import User from './User'
import Forgot from './Forgot'
import Reset from './Reset'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Main}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/set-password/:id' exact component={SetPwd}/>
          <Route path='/profile' exact component={Profile}/>
          <Route path='/search' exact component={Search}/>
          <Route path='/home' exact component={Home}/>
          <Route path='/change-password' exact component={ChangePwd}/>
          <Route path='/edit-profile' exact component={Edit}/>
          <Route path='/verify-email/:id/:code/:email' exact component={Verify}/>
          <Route path='/post' exact component={Post}/>
          <Route path='/user/:username' exact component={User}/>
          <Route path='/forgot-password' exact component={Forgot}/>
          <Route path='/reset-password/:id' exact component={Reset}/>
          <Redirect to='/'/>
        </Switch>

      </BrowserRouter>
    )
  }
}

export default App
