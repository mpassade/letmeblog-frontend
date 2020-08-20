import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Register extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        input: {
            fname: '',
            lname: '',
            email: '',
            username: ''
        }
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
        axios.post('/register', this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            if (message[0].type==='success'){
                let input = {
                    fname: '',
                    lname: '',
                    email: '',
                    username: ''
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
    render(){
        return (
            <>
            <Nav
                page='register'
            />
            <form onSubmit={this.handleSubmit}>
                <div
                className={'register' + (this.state.message[0].type==='success' ? ' large' : '')}
                >
                    <header>Register</header>
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
                        placeholder='First Name'
                        name='fname'
                        onChange={this.handleChange}
                        value={this.state.input.fname}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lname'
                        onChange={this.handleChange}
                        value={this.state.input.lname}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.input.email}
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.input.username}
                    />
                    <Link to='/login'>Already have an account?<br/>Login here</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
            </>
        )
    }
}

export default Register
