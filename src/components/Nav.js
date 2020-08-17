import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className='nav'>
            <span>
                <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
            </span>
        </div>
    )
}

export default Nav
