import React from 'react'
import { Link } from 'react-router-dom'

const UserInfo = (props) => {
    return (
        <div className='user'>
            <header>{props.username}</header>
            <div className='user-info'>
                <div className='col-1'>
                    <img src={props.pic}/>
                    <span className='name'>{props.fname} {props.lname}</span>
                    <textarea value={props.bio} readOnly/>
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
                        <Link to='/post'>
                            <button className='create'>Create Post</button>
                        </Link>
                        <div>
                            <Link to='/edit-profile'>
                                <button>Edit Profile</button>
                            </Link>
                            <Link to='/change-password'>
                                <button>Change Password</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
