import React from 'react'

const Header = (props) => {
    return (
        <>
        <header className={props.class}>
            {props.text}
        </header>
        </>
    )
}

export default Header
