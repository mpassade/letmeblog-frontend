import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Post extends Component {
    state = {
        user: {},
        message: [{
            type: '',
            text: ''
        }],
        input: {
            title: '',
            blog: ''
        },
        isAuthenticated: true
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    handleChange = (e) => {
        let input = {...this.state.input}
        input[e.target.name] = e.target.value
        this.setState({input})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`/change-password/${this.state.user.username}`, this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            if (message[0].type==='success'){
                let input = {
                    oldPass: '',
                    newPass: '',
                    confirmNew: ''
                }
                this.setState({
                    message,
                    input
                })
            } else {
                this.setState({message})
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
                page='post'
            />
            <form onSubmit={this.handleSubmit}>
                <div
                className='post'
                >
                    {this.state.message.map((msg, idx) => {
                        return (
                            <span
                            key={idx}
                            className={msg.type}
                            >
                                {msg.text}
                            </span>
                        )
                    })}
                    <input
                        type='text'
                        placeholder='Title (optional)'
                        name='title'
                        onChange={this.handleChange}
                        value={this.state.input.title}
                    />
                    <textarea
                        placeholder='Blog!'
                        name='blog'
                        onChange={this.handleChange}
                        value={this.state.input.blog}
                    />
                    <div>
                        <button type='submit' className='create-post'>Post</button>
                        <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                    </div>
                    
                </div>
            </form>
            </>
        )
    }
}

export default Post
