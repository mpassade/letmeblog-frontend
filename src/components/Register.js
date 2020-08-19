import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

class Register extends Component {
    state = {
        error: []
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {fname, lname, email, username} = this.form
        if (!fname.value || !lname.value || 
        !email.value || !username.value){
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
                page='register'
            />
            <form onSubmit={this.handleSubmit} ref={this.getForm}>
                <div className='register'>
                    <header>Register</header>
                    {this.state.error.map((msg, idx) => {
                        return <span key={idx}>{msg}</span>
                    })}
                    <input
                        type='text'
                        placeholder='First Name'
                        name='fname'
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lname'
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
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
