import React from 'react'
import { Link } from 'react-router-dom'

export default function PostsIndex(props) {
    return (
        <div>
            <h1>Post Index</h1>
            {props.posts.map((prop, index) => (
                <div key={index}>
                    {prop.content}
                </div>
            ))}
            <Link to="/movies">Movies</Link>
        </div>
    )
}