import React from 'react'

export default function PostsIndex(props) {
    return(
        <div>
            <h1>Post Index</h1>
            {props.posts.map((prop, index) => (
                <div key={index}>
                {prop.content}
                </div>
            ))}
            
        </div>
    )
}