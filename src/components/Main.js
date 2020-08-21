import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import Header from './Header'
import Search from './Search'

class Main extends Component {
    state = {
        isAuthenticated: false
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    componentDidMount(){
        if (this.isAuthenticated()){
            return this.setState({isAuthenticated: true})
        }
    }
    render(){
        if (this.state.isAuthenticated){
            return <Redirect to='/profile'/>
        }
        return (
            <>
            <Nav
                page='main'
            />
            <div className='main'>
                <Header/>
                <Search/>
            </div>
            </>
        )
    }
}

export default Main
