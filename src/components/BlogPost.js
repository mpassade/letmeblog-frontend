import React from 'react'

const BlogPost = (props) => {
    let content = null
    switch (true){
        case (props.home):
            content = 
                <>
                <div>
                    <span></span>
                    <span></span>
                </div>
                <img/>
                </>
            break
        case (!props.home):
            content = <span className='right'>{props.time}</span>
            break
    }
    return (
        <div className='blog'>
            {content}
            <header className={props.header}>{props.title}</header>
            <p>{props.article}</p>
        </div>
    )
}

export default BlogPost
