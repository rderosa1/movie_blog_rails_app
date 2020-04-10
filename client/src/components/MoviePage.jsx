import React from 'react'

function MoviePage(props) {

    const oneMovie = props.movies.find((movie) => (
        props.match.params.id == movie.id
    ))

    return (
        <>
        {oneMovie && 
        <div>
            <p>{oneMovie.title}</p>
        </div>
        }
        </>
    )
}

export default MoviePage;