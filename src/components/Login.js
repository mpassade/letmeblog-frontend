import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Login = () => {
    return (
        <>
        <Nav
            page='login'
        />
        <form>
            <div className='login'>
                <header>Login</header>
                <input
                    type='text'
                    placeholder='Username or Email'
                />
                <input
                    type='password'
                    placeholder='Password'
                />
                <div>
                    <Link to='/forgot-password'>Forgot Password?</Link>
                    <Link to='/register' style={{textAlign: 'right'}}>Don't have an account?<br/>Register here</Link>
                </div>
                <button>Sign In</button>
            </div>
        </form>
        </>
    )
}

export default Login
