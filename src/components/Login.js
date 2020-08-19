import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Login = (props) => {
    return (
        <>
        <Nav
            page='login'
        />
        <form onSubmit={props.submit} ref={props.form}>
            <div className='login'>
                <header>Login</header>
                {props.error.map((msg, idx) => {
                    
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

export default Login
