import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import BlogPost from './BlogPost'
import axios from 'axios'

class Profile extends Component {
    state = {
        user: {},
        isAuthenticated: true,
        blogs: []
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
        axios.get('/user-blog', axiosConfig).then(res => {
            if (res.data.user){
                return this.setState({
                    user: res.data.user,
                    blogs: res.data.blogs
                })
            }
            return this.setState({isAuthenticated: res.data.isAuthenticated})
        }).catch(() => {
            return this.setState({isAuthenticated: false})
        })

    }
    render(){
        if (!this.state.isAuthenticated){
            return <Redirect to='/'/>
        } console.log(this.state)
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
                follows={this.state.user.follows ? this.state.user.follows.length : 0}
                bio={this.state.user.bio}
                div='user'
            />
            {this.state.blogs.map((blogs, idx) => {
                return (
                    <BlogPost
                        key={idx}
                        home={false}
                        time={blogs.timestamp}
                        title={blogs.title}
                        article={blogs.content}
                    />
                )
            })}
            </>
        )
    }
}

export default Profile
