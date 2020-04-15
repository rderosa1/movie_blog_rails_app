import React from 'react'
import Nav from './Nav'

export const Header = (props) => {
    return (
        <>
            <div className = "header">
                <h1>Welcome to <span id = "movie-massacre">MovieMassacre</span></h1>
                <Nav />
            </div>
        </>
    )

}