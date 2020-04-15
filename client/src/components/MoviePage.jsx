import React from 'react'
import { Link } from 'react-router-dom'

function MoviePage(props) {

    const oneMovie = props.movies.find((movie) => (
        props.match.params.id == movie.id
    ))
    console.log(oneMovie)

    return (
        <div className = "movie-page">
        {oneMovie && 
        <div className = "movie-title">
            <p>{oneMovie.title}</p>
        </div>
        }
        {oneMovie && <Link to ={`/movies/${oneMovie.title}/posts`}><button> Post a blog </button></Link>}
        {<Link to ="/movies"><button> See Movies </button></Link>}
        </div>
    )
}

export default MoviePage;