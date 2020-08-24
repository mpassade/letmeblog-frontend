import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

class Edit extends Component {
    state = {
        user: {},
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
    handleImageUpload = e => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            const {current} = this.uploadedImage
            const input = {...this.state.input}
            reader.onload = (event) => {
                current.src = event.target.result
                input['picture'] = event.target.result
            }
            reader.readAsDataURL(file)
            const data = new FormData()
            data.append('file', file)
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            axios.post(`http://localhost:8000/upload/${this.state.user.id}`, data, axiosConfig).then(res => {
                if (res.data.user){
                    let user = {...this.state.user}
                    user['picture'] = res.data.user.picture
                    let message = [...this.state.message]
                    message[0] = res.data.message
                    this.setState({
                        user,
                        input,
                        message
                    })
                }
            }).catch(err => {
                console.log(`Server Error: ${err}`)
            })
        }
    }
    uploadedImage = React.createRef()
    handleChange = (e) => {
        let input = {...this.state.input}
        input[e.target.name] = e.target.value
        this.setState({input})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.input.fname===this.state.user.firstName &&
            this.state.input.lname===this.state.user.lastName &&
            this.state.input.username===this.state.user.username &&
            this.state.input.email===this.state.user.email &&
            this.state.input.bio===this.state.user.bio &&
            this.state.input.privacy===this.state.user.privacy
            ){
                let message = [...this.state.message]
                message[0] = {
                    type: 'no-change',
                    text: 'No changes have been made'
                }
                return this.setState({message})
        }
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        
        axios.put(`/edit-profile/${this.state.user.id}`, this.state.input, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data.message
            if (message[0].type==='success'){
                this.setState({
                    user: res.data.user,
                    message,
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
                const input = {
                    id: res.data.user.id,
                    fname: res.data.user.firstName,
                    lname: res.data.user.lastName,
                    username: res.data.user.username,
                    email: res.data.user.email,
                    bio: res.data.user.bio,
                    privacy: res.data.user.privacy,
                    picture: res.data.user.picture
                }
                if (this.props.location.state){
                    let message = [...this.props.location.state.message]
                    this.props.history.replace('/edit-profile', null)
                    return this.setState({
                        message,
                        input,
                        user: res.data.user
                    })
                } else {
                    return this.setState({
                        user: res.data.user,
                        input
                    })
                }
            } else {
                return this.setState({isAuthenticated: res.data.isAuthenticated})
            }
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
                page='edit'
            />
            <form onSubmit={this.handleSubmit}>
                <div
                className={'edit'}
                >
                    <header>Edit Profile</header>
                    <img
                        src={this.state.input.picture}
                        ref={this.uploadedImage}
                    />
                    <label className='upload'>
                        <span>Change Profile Photo</span>
                        <input
                            type="file"
                            accept="image/*" 
                            onChange={this.handleImageUpload}
                            multiple = {false}
                        /> 
                    </label>
                    
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
                        <label htmlFor='privacy'>Privacy:</label>
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
