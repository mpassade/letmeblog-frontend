import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class SetPwd extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        input: {
            tempPass: '',
            newPass: '',
            confirmNew: ''
        },
        isAuthenticated: false,
        goToLogin: false,
        tempPwd: true
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
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`/set-password/${this.props.match.params.id}`, this.state.input, axiosConfig).then(res => {
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
        axios.get(`/check-temp-pwd/${this.props.match.params.id}`).then(res => {
            return this.setState({tempPwd: res.data.tempPwd})
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
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
        if (!this.state.tempPwd){
            return <Redirect to='/'/>
        }
        return (
            <>
            <Nav
                page='setPwd'
            />
            <form onSubmit={this.handleSubmit}>
                <div className='setPwd'>
                    <header>Set Password</header>
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
                        type='password'
                        placeholder='Temporary Password'
                        name='tempPass'
                        onChange={this.handleChange}
                        value={this.state.input.tempPass}
                    />
                    <input
                        type='password'
                        placeholder='New Password'
                        name='newPass'
                        onChange={this.handleChange}
                        value={this.state.input.newPass}
                    />
                    <input
                        type='password'
                        placeholder='Confirm New Password'
                        name='confirmNew'
                        onChange={this.handleChange}
                        value={this.state.input.confirmNew}
                    />
                    <button type='submit'>Submit</button>
                </div>
            </form>
            </>
        )
    }
}

export default SetPwd
