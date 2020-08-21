import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Nav = (props) => {
    let content = null
    const logout = () => {
        localStorage.removeItem('token')
    }
    switch (true){
        case (props.page==='main'):
            content = 
                <span>
                    <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
                </span>
            break
        case (props.page==='register' || props.page==='login'):
            content = 
                <Link to='/'>
                    <img src='/images/home_not-selected.png'/>
                </Link>
            break
        case (props.page==='setPwd'):
            content =
                <>
                <span>
                    <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
                </span>
                <Link to='/'>
                    <img src='/images/home_not-selected.png'/>
                </Link>
                </>
            break
        case (props.page==='profile'):
            content =
                <>
                <Link to='/home'>
                    {props.page==='home' ? 
                        <img src='/images/home_selected.png'/> :
                        <img src='/images/home_not-selected.png'/>
                    }
                </Link>
                <Link to='/search'>
                    {props.page==='search' ? 
                        <img src='/images/search_selected.png'/> :
                        <img src='/images/search_not-selected.png'/>
                    }
                </Link>
                <Link to='/profile'>
                    {props.page==='profile' ? 
                        <img src='/images/profile_selected.png'/> :
                        <img src='/images/profile_not-selected.png'/>
                    }
                </Link>
                <span>
                    <Link
                        to='/login'
                        onClick={logout}
                    >
                        Logout
                    </Link>
                </span>
                </>
            break
    }
    return (
        <div className='nav'>
            {content}
        </div>
    )
}

Nav.propTypes = {
    page: PropTypes.string
}

export default Nav
