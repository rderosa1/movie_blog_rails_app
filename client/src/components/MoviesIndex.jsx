import React from 'react'

export default function MoviesIndex(props) {
    return(
        <div>
            <h1>Movies Index</h1>
            {props.movies.map((movie, index) => (
                <div key={index}>
                <h2>{movie.title}</h2>
                <p>{movie.year_released}</p>
                <p>{movie.director}</p>
                </div>
            ))}
        </div>
    )
}