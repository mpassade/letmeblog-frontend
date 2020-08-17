import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'


class App extends Component {

  componentDidMount(){
    
  }
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={Login}/>
      </BrowserRouter>
    )
  }
}

export default App
