import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Input from './Input'


const Register = () => {
    return (
        <>
        <Nav
            page='register'
        />
        <div className='register'>
            <header>Register</header>
            <form>
                <Input/>
            </form>
        </div>
        </>
    )
}

export default Register
