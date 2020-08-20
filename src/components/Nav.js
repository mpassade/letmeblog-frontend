import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Nav = (props) => {
    let content = null
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
