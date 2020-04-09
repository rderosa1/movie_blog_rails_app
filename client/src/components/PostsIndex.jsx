import React from 'react'

export default function PostsIndex(props) {
    return(
        <div>
            Post Index
            {props.posts.map((prop, index) => (
                <div key={index}>
                {prop.content}
                </div>
            ))}
            
        </div>
    )
}