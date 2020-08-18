import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'


class App extends Component {
  inputChangedHandler = (event) => {
    console.log('yo')
  }
  componentDidMount(){
  }
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={() => {
          return <Login changed={this.inputChangedHandler}/>
        }}/>
        <Route path='/register' exact component={() => {
          return <Register changed={this.inputChangedHandler}/>
        }}/>
      </BrowserRouter>
    )
  }
}

export default App
