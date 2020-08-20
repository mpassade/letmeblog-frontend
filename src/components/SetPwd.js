import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        }
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
            this.setState({message})
        }).catch(err => {
            console.log(`Server Error: ${err}`)
        })
    }
    render(){
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
