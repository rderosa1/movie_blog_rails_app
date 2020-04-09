import React from 'react'

export default function MoviesIndex(props) {
    return(
        <div>
            Movies Index
            {props.movies.map((movie, index) => (
                <div key={index}>
                {movie.title}
                </div>
            ))}
        </div>
    )
}