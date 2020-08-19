import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

class Login extends Component {
    state = {
        error: []
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.form
        if (!username.value || !password.value){
            this.setState({
                error: ['All fields are required']
            }) 
        }
    }
    getForm = (form) => {
        this.form = form
    }
    render(){
        return (
            <>
            <Nav
                page='login'
            />
            <form onSubmit={this.handleSubmit} ref={this.getForm}>
                <div className='login'>
                    <header>Login</header>
                    {this.state.error.map((msg, idx) => {
                        return <span key={idx}>{msg}</span>
                    })}
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
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
