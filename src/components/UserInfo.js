import React from 'react'
import { Redirect } from 'react-router-dom'

const UserInfo = (props) => {
    return (
        <div className='user'>
            <header>{props.username}</header>
            <div className='user-info'>
                <div className='col-1'>
                    <img src={props.pic}/>
                    <span className='name'>{props.fname} {props.lname}</span>
                    <p>{props.bio}</p>
                </div>
                <div className='col-2'>
                    <div className='row-1'>
                        <div>
                            <span>{props.posts}</span>
                            <span>{props.posts===1 ? 'Post' : 'Posts'}</span>
                        </div>
                        <div>
                            <span>{props.followers}</span>
                            <span>{props.followers===1 ? 'Follower' : 'Followers'}</span>
                        </div>
                        <div>
                            <span>{props.follows}</span>
                            <span>Following</span>
                        </div>
                    </div>
                    <div className='row-2'>
                        <button>Create Post</button>
                        <div>
                            <button>Edit Profile</button>
                            <button>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
