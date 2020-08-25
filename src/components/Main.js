import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import Header from './Header'
import axios from 'axios'

class Main extends Component {
    state = {
        users: [],
        input: {
            search: ''
        },
        isAuthenticated: false,
        search: false
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    handleChange = (e) => {
        let input = {...this.state.input}
        input[e.target.name] = e.target.value
        this.setState({input})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.input.search){
            axios.get(`http://localhost:8000/search-all`).then(res => {
                if (res.data.users){
                    return this.setState({
                        users: res.data.users,
                        search: true
                    })
                }
            }).catch(err => {
                console.log(`Server Error: ${err}`)
            })
        } else {
            axios.get(`http://localhost:8000/search/${this.state.input.search}`).then(res => {
                if (res.data.users){
                    return this.setState({
                        users: res.data.users,
                        search: true
                    })
                }
            }).catch(err => {
                console.log(`Server Error: ${err}`)
            })
        }
    }
    componentDidMount(){
        if (this.isAuthenticated()){
            return this.setState({isAuthenticated: true})
        }
    }
    render(){
        if (this.state.isAuthenticated){
            return <Redirect to='/profile'/>
        }
        if (this.state.search){
            return <Redirect to={{
                pathname: '/search',
                state: {users: [...this.state.users]}
            }}/>
        }
        return (
            <>
            <Nav
                page='main'
            />
            <div className='main'>
                <Header class='lmb' text='Let Me Blog'/>
                <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='search'
                    placeholder='Search'
                    className='searchbox'
                    onChange={this.handleChange}
                />
                <input
                    type='submit'
                    style={{display: 'none'}}
                />
            </form>
            </div>
            </>
        )
    }
}

export default Main
