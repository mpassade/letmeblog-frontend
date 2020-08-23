import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Edit extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        input: {
            fname: '',
            lname: '',
            username: '',
            email: '',
            bio: '',
            privacy: '',
            picture: ''
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
        axios.put(`/edit-profile/${this.state.user.username}`, this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            this.setState({message})
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
                return this.setState({
                    input: {
                        fname: res.data.user.firstName,
                        lname: res.data.user.lastName,
                        username: res.data.user.username,
                        email: res.data.user.email,
                        bio: res.data.user.bio,
                        privacy: res.data.user.privacy,
                        picture: res.data.user.picture
                    }
                })
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
        console.log(this.state.input)
        return (
            <>
            <Nav
                page='edit'
            />
            <form onSubmit={this.handleSubmit}>
                <div
                className={'edit'}
                >
                    <header>Edit Profile</header>
                    <img src={this.state.input.picture}/>
                    <span>Change Profile Photo</span>
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
                        type='text'
                        placeholder='First Name'
                        name='fname'
                        onChange={this.handleChange}
                        value={this.state.input.fname}
                    />
                    <input
                        type='text'
                        placeholder='Last Name'
                        name='lname'
                        onChange={this.handleChange}
                        value={this.state.input.lname}
                    />
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={this.handleChange}
                        value={this.state.input.username}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.input.email}
                    />
                    <div className='privacy'>
                        <label for='privacy'>Privacy:</label>
                        <select
                            name="privacy"
                            onChange={this.handleChange}
                            value={this.state.input.privacy}
                        >
                            <option value='private'>Private</option>
                            <option value='public'>Public</option>
                        </select>
                    </div>
                    <textarea
                        placeholder='Short description about yourself'
                        name='bio'
                        onChange={this.handleChange}
                        value={this.state.input.bio}
                    />
                    <div>
                        <button type='submit' className='submit'>Submit</button>
                        <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                    </div>
                </div>
            </form>
            </>
        )
    }
}

export default Edit
