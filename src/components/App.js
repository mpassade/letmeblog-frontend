import React, { Component } from 'react'
import Header from './Header'
import Search from './Search'
import Nav from './Nav'

class App extends Component {
  componentDidMount(){
    
  }
  render(){
    return (
      <>
      <Nav/>
        <div className='main'>
          <Header/>
          <Search/>
        </div>
      </>
    )
  }
}

export default App
