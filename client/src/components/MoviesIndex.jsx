import React from 'react'
import { Link } from 'react-router-dom'

export default function MoviesIndex(props) {
    return (
        <div className="movies-index-page">
            <h1>Movies Index</h1>
            {props.movies.map((movie, index) => (
                <div className="movie-info" key={index}>
                    <Link to={`/movies/${movie.id}`}>
                        <h2>{movie.title}</h2></Link>
                    <p>release: {movie.year_released}</p>
                    <p>director: {movie.director}</p>
                    {movie.posts.map((post) => (
                        <div className = "movie-posts">
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            ))}
            <br/>
            <Link to="/posts"><span className="posts-link">Posts</span></Link>
            <br />
        </div>
    )
}