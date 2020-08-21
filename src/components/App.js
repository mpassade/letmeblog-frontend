import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import SetPwd from './SetPwd'
import Profile from './Profile'

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
          <Redirect to='/'/>
        </Switch>

      </BrowserRouter>
    )
  }
}

export default App
