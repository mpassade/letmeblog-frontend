import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import Header from './Header'
import axios from 'axios'

class Home extends Component {
    state = {
        users: [],
        isAuthenticated: true
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }

    componentDidMount(){
        if (!this.isAuthenticated()){
            return this.setState({isAuthenticated: false})
        }
        const axiosConfig = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/home', axiosConfig).then(res => {
            if (res.data.users){
                return this.setState({users: res.data.users})
            }
            return this.setState({isAuthenticated: false})
        }).catch(() => {
            return this.setState({isAuthenticated: false})
        })

    }
    render(){
        if (!this.state.isAuthenticated){
            return <Redirect to='/'/>
        }
        return (
            <>
            <Nav
                page='home'
            />
            <Header class='home-header' text={this.state.users.length ? 'Following' : 'No Users Followed'}/>
            {this.state.users.map((profile, idx) => {
                return (
                    <UserInfo
                        key={idx}
                        id={profile._id}
                        page='search'
                        pic={profile.picture}
                        username={profile.username}
                        div='searched-user'
                    />
                )
            })}
            </>
        )
    }
}

export default Home
