import React from 'react'
import Nav from './Nav'
import Header from './Header'
import Search from './Search'

const Main = () => {
    return (
        <>
        <Nav
            page='main'
        />
        <div className='main'>
            <Header/>
            <Search/>
        </div>
        </>
    )
}

export default Main
