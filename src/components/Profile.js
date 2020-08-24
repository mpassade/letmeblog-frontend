import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import axios from 'axios'

class Profile extends Component {
    state = {
        user: {},
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
        axios.get('/user', axiosConfig).then(res => {
            if (res.data.user){
                return this.setState({user: res.data.user})
            }
            return this.setState({isAuthenticated: res.data.isAuthenticated})
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
                page='profile'
            />
            <UserInfo
                username={this.state.user.username}
                pic={this.state.user.picture}
                fname={this.state.user.firstName}
                lname={this.state.user.lastName}
                posts={this.state.user.blogPosts!==undefined ? this.state.user.blogPosts.length : ''}
                followers={this.state.user.followedBy}
                follows={this.state.user.follows}
                bio={this.state.user.bio}
            />
            </>
        )
    }
}

export default Profile
