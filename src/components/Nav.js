import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Nav = (props) => {
    return (
        <div className='nav'>
            {props.page==='main' ?
                <span>
                    <Link to='/login'>Login</Link> | <Link to='/register'>Register</Link>
                </span>
            : 
            // props.page==='login' || props.page==='register' 
                <Link to='/'>
                    <img src='/images/home_not-selected.png'/>
                </Link>
            }
            
        </div>
    )
}

Nav.propTypes = {
    page: PropTypes.string
}

export default Nav
