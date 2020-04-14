import React from 'react'
import { Link } from 'react-router-dom'

export default function PostsIndex(props) {
    console.log(props)
    return (
        <div>
            <h1>Post Index</h1>
            {props.posts.map((post, index) => (
                <div key={index}>
                    <Link to={`/posts/${post.id}`}>
                        {post.content}
                    </Link>
                </div>
            ))}
            <Link to="/movies">Movies</Link>
        </div>
    )
}