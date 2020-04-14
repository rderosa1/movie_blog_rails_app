import React from 'react'
import { Link } from 'react-router-dom'

export default function MoviesIndex(props) {
    return(
        <div>
            <h1>Movies Index</h1>
            {props.movies.map((movie, index) => (
                <div key={index}>
                <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2></Link>
                <p>{movie.year_released}</p>
                <p>{movie.director}</p>
                </div>
            ))}
            <Link to = "/posts">Posts</Link>
        </div>
    )
}