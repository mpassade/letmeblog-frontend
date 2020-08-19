import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
      </BrowserRouter>
    )
  }
}

export default App
