import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import BlogPost from './BlogPost'
import axios from 'axios'

class User extends Component {
    state = {
        id: '',
        username: '',
        follows: [],
        user: {},
        noUser: false,
        blogs: [],
        isAuthenticated: false
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    follows = () => {
        for (const id of this.state.follows){
            if (JSON.stringify(id)===JSON.stringify(this.state.user.id)){
                return true
            }
        }
        return false
    }
    follow = (e) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`http://localhost:8000/follow/${this.state.id}/${e.target.id}`, {}, axiosConfig)
        .then(res => {
            console.log(res.data)
            if (res.data.user2){
                this.setState({
                    user: res.data.user2,
                    follows: res.data.user.follows
                })
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
    }
    unfollow = (e) => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`http://localhost:8000/unfollow/${this.state.id}/${e.target.id}`, {}, axiosConfig)
        .then(res => {
            if (res.data.user2){
                this.setState({
                    user: res.data.user2,
                    follows: res.data.user.follows
                })
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
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
                    isAuthenticated: true,
                    id: res.data.id,
                    follows: res.data.follows
                })
            }
            return this.setState({
                user: res.data.user,
                username: res.data.username,
                isAuthenticated: true,
                id: res.data.id,
                follows: res.data.follows
            })
        }).catch(() => {
            return this.setState({noUser: true})
        })
    }
    render(){
        console.log(this.state.user.followedBy)
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
            />{console.log(this.follows())}
            <UserInfo
                page='user'
                username={this.state.user.username}
                pic={this.state.user.picture}
                fname={this.state.user.firstName}
                lname={this.state.user.lastName}
                posts={this.state.user.blogPosts!==undefined ? this.state.user.blogPosts.length : 0}
                followers={this.state.user.followedBy!==undefined ? this.state.user.followedBy.length : 0}
                follows={this.state.user.follows!==undefined ? this.state.user.follows.length : 0}
                bio={this.state.user.bio}
                div='user'
                authenticated={this.state.isAuthenticated}
                privacy={this.state.user.privacy}
                follow={this.follow}
                unfollow={this.unfollow}
                followsFunc={this.follows()}
                id={this.state.user.id}
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
