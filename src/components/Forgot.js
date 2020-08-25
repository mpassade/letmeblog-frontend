import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Forgot extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        input: {
            email: ''
        },
        isAuthenticated: false,
        goToLogin: false
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
        if (!this.state.input.email){
            let message = [...this.state.message]
            message[0] = {type: 'error', text: 'Please enter your email address'}
            return this.setState({message})
        }
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`/forgot-password/${this.state.input.email}`, {}, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            if (message[0].type==='success'){
                this.setState({
                    message,
                    goToLogin: true
                })
            } else {
                this.setState({message})
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
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
        if (this.state.goToLogin){
            return <Redirect to={{
                pathname: '/login',
                state: {message: [...this.state.message]}
            }}/>
        }
        return (
            <>
            <Nav
                page='forgot'
            />
            <form onSubmit={this.handleSubmit}>
                <div className='forgot'>
                    <header>Request Password Reset</header>
                    {this.state.message.map((msg, idx) => {
                        return (
                            <span
                            key={idx}
                            className={msg.type}
                            >
                                {msg.text}
                            </span>
                        )
                    })}
                    <input
                        type='email'
                        placeholder='Please enter your email address'
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.input.email}
                    />
                    <button type='submit'>Submit</button>
                </div>
            </form>
            </>
        )
    }
}

export default Forgot
