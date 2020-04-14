import React from 'react'
import { Link } from 'react-router-dom'

export default function PostsIndex(props) {
    console.log(props)
    return (
        <div className = "posts-index-page">
            <h1>Post Index</h1>
            {props.posts.map((post, index) => (
                <div className = "post-content" key={index}>
                    <Link to={`/posts/${post.id}`}>
                        <span className = "individual-post">{post.content}</span>
                    </Link>
                </div>
            ))}
            <Link to="/movies"><span className = "movies-link">Movies</span></Link>
        </div>
    )
}