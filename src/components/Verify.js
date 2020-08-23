import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Verify extends Component {
    state = {
        message: [{
            type: '',
            text: ''
        }],
        isAuthenticated: true,
        verified: false,
        exit: false
    }
    isAuthenticated = () => {
        return localStorage.getItem('token')
    }
    componentDidMount(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
            }
        }
        axios.put(`/verify-email/${this.props.match.params.id}/${this.props.match.params.code}/${this.props.match.params.email}`, {}, axiosConfig).then(res => {
            let message = [...this.state.message]
            message[0] = res.data
            if (message[0].type==='success'){
                if (!this.isAuthenticated()){
                    return this.setState({
                        isAuthenticated: false,
                        message,
                        verified: true
                    })
                } else {
                    return this.setState({
                        message,
                        verified: true
                    })
                }
            } else {
                return this.setState({exit: true})
            }
        }).catch(() => {
            this.setState({exit: true})
        })
    }
    render(){
        if (this.state.exit){
            return <Redirect to='/'/>
        }
        if (this.state.verified){
            if (this.state.isAuthenticated){
                return <Redirect to={{
                    pathname: '/edit-profile',
                    state: {message: [...this.state.message]}
                }}/>
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: {message: [...this.state.message]}
                }}/>
            }
        }
        return (
            <></>
        )
    }
}

export default Verify
