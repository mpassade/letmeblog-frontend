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
        done: false,
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
        axios.post(`http://localhost:8000/create-post/${this.state.user.id}`, this.state.input, axiosConfig).then(res => {
            if (res.data.type==='error'){
                let message = [...this.state.message]
                message[0] = res.data
                this.setState({message})
            } else if (res.data.type==='success'){
                this.setState({done: true})
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
        axios.get('http://localhost:8000/user', axiosConfig).then(res => {
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
        if (this.state.done){
            return <Redirect to='/profile'/>
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
