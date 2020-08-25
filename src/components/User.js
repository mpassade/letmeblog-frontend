import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import BlogPost from './BlogPost'
import axios from 'axios'

class User extends Component {
    state = {
        username: '',
        user: {},
        noUser: false,
        blogs: [],
        isAuthenticated: false
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    componentDidMount(){
        if (!this.isAuthenticated()){
            axios.get(`http://localhost:8000/other-user-blog/${this.props.match.params.username}`)
            .then(res => {
                if (res.data.noUser){
                    return this.setState({noUser: true})
                }
                if (res.data.blogs){
                    return this.setState({
                        user: res.data.user,
                        blogs: res.data.blogs
                    })
                }
                return this.setState({
                    user: res.data.user
                })
            }).catch(() => {
                return this.setState({noUser: true})
            })
            return
        }
        const axiosConfig = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get(`http://localhost:8000/other-auth/${this.props.match.params.username}`, axiosConfig).then(res => {
            if (res.data.noUser){
                return this.setState({noUser: true})
            }
            if (res.data.blogs){
                return this.setState({
                    user: res.data.user,
                    blogs: res.data.blogs,
                    username: res.data.username,
                    isAuthenticated: true
                })
            }
            return this.setState({
                user: res.data.user,
                username: res.data.username,
                isAuthenticated: true
            })
        }).catch(() => {
            return this.setState({noUser: true})
        })

    }
    render(){
        if (this.state.noUser){
            return <Redirect to='/'/>
        }
        if (this.state.username===this.state.user.username){
            return <Redirect to='/profile'/>
        }
        return (
            <>
            <Nav
                page={this.state.isAuthenticated ? 'user' : 'user-pg'}
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

export default User
