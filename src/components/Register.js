import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

const Register = () => {
    return (
        <>
        <Nav
            page='register'
        />
        <form>
            <div className='register'>
                <header>Register</header>
                <input
                    type='email'
                    placeholder='Email Address'
                />
                <input
                    type='text'
                    placeholder='Username'
                />
                <Link to='/login'>Already have an account?<br/>Login here</Link>
                <button>Sign Up</button>
            </div>
        </form>
        </>
    )
}

export default Register
