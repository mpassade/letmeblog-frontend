import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import UserInfo from './UserInfo'
import axios from 'axios'

class Search extends Component {
    state = {
        user: {},
        users: [],
        input: {
            search: ''
        },
        isAuthenticated: true
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    follows = (profile) => {
        for (const user of this.state.user.follows){
            if (JSON.stringify(user)===JSON.stringify(profile._id)){
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
        axios.put(`http://localhost:8000/follow/${this.state.user.id}/${e.target.id}`, {}, axiosConfig)
        .then(res => {
            
            if (res.data.user){
                this.setState({
                    user: res.data.user
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
        axios.put(`http://localhost:8000/unfollow/${this.state.user.id}/${e.target.id}`, {}, axiosConfig)
        .then(res => {
            if (res.data.user){
                this.setState({
                    user: res.data.user
                })
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
    }
    handleChange = (e) => {
        let input = {...this.state.input}
        input[e.target.name] = e.target.value
        this.setState({input})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:8000/search/${this.state.input.search}`).then(res => {
            if (res.data.users){
                return this.setState({
                    users: res.data.users
                })
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
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
                return this.setState({
                    user: res.data.user
                })
            }
            return this.setState({isAuthenticated: res.data.isAuthenticated})
        }).catch(() => {
            return this.setState({isAuthenticated: false})
        })
    }
    render(){
        return (
            <>
            {this.state.isAuthenticated ? <Nav page='search'/> :
                <Nav page='search-not-logged-in'/>
            }
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='search'
                    placeholder='Search'
                    className='searchbox'
                    onChange={this.handleChange}
                />
                <input
                    type='submit'
                    style={{display: 'none'}}
                />
            </form>
            {this.state.users.map((profile, idx) => {
                return (
                    <UserInfo
                        key={idx}
                        id={profile._id}
                        page='search'
                        authenticated={this.state.isAuthenticated}
                        pic={profile.picture}
                        follows={this.follows(profile)}
                        you={JSON.stringify(profile._id)===JSON.stringify(this.state.user.id)}
                        username={profile.username}
                        div='searched-user'
                        follow={this.follow}
                        unfollow={this.unfollow}
                    />
                )
            })}
            </>
        )
    }
}

export default Search
