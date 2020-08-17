import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Input from './Input'


const Login = () => {
    return (
        <>
        <Nav
            page='login'
        />
        <div className='login'>
            <header>Login</header>
            <form>
                <Input/>
            </form>
        </div>
        </>
    )
}

export default Login
