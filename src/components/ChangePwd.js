import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class ChangePwd extends Component {
    state = {
        user: {},
        message: [{
            type: '',
            text: ''
        }],
        input: {
            oldPass: '',
            newPass: '',
            confirmNew: ''
        },
        isAuthenticated: true
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
        axios.put(`/change-password/${this.state.user.username}`, this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            if (message[0].type==='success'){
                let input = {
                    oldPass: '',
                    newPass: '',
                    confirmNew: ''
                }
                this.setState({
                    message,
                    input
                })
            } else {
                this.setState({message})
            }
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
    }
    componentDidMount(){
        if (!this.isAuthenticated()){
            return this.setState({isAuthenticated: false})
        }
        const axiosConfig = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get('/user', axiosConfig).then(res => {
            if (res.data.user){
                return this.setState({user: res.data.user})
            }
            return this.setState({isAuthenticated: res.data.isAuthenticated})
        }).catch(() => {
            return this.setState({isAuthenticated: false})
        })
    }
    render(){
        if (!this.state.isAuthenticated){
            return <Redirect to='/'/>
        }
        return (
            <>
            <Nav
                page='changePwd'
            />
            <form onSubmit={this.handleSubmit}>
                <div
                className={'change-pwd'}
                >
                    <header>Change Password</header>
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
                        placeholder='Old Password'
                        name='oldPass'
                        onChange={this.handleChange}
                        value={this.state.input.oldPass}
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
                    <div>
                        <button type='submit' className='change'>Change</button>
                        <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                    </div>
                    
                </div>
            </form>
            </>
        )
    }
}

export default ChangePwd
