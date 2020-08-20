import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Login extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        input: {
            username: '',
            password: ''
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
        axios.post('/login', this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            this.setState({message})
        }).catch(err => {
            console.log('Test Error: ' ,err.response)
            // console.log(`Server Error: ${err}`)
        })
    }
    render(){
        return (
            <>
            <Nav
                page='login'
            />
            <form onSubmit={this.handleSubmit}>
                <div className='login'>
                    <header>Login</header>
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
                        placeholder='Username'
                        name='username'
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={this.handleChange}
                    />
                    <div>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                        <Link to='/register' style={{textAlign: 'right'}}>Don't have an account?<br/>Register here</Link>
                    </div>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
            </>
        )
    }
}

export default Login
