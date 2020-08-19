import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'

class App extends Component {
  state = {
    error: []
  }
  handleSubmit = (e) => {
    // e.preventDefault()
    const {username, password} = this.form
    if (!username.value || !password.value){
      this.setState({
        error: ['All fields are required']
      }) 
    }
  }
  
  getForm = (form) => {
    this.form = form
  }
  componentDidUpdate(){
    // this.input.focus()
  }
  render(){
    return (
      <BrowserRouter>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={() => {
          return <Login
          error={this.state.error}
          submit={this.handleSubmit}
          form={this.getForm}
          />
        }}/>
        <Route path='/register' exact component={() => {
          return <Register
            changed={this.inputChangedHandler}
            checkInput={this.checkInput}
            
          />
        }}/>
      </BrowserRouter>
    )
  }
}

export default App
