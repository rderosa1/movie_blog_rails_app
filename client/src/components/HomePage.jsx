import React from 'react'
import { Header } from './Header'
import { Nav } from './Nav'

export const HomePage = (props) => {
    return (
        <>
            <Header />
            <Nav />
            <blockquote>
                No good movie is too long, and no bad movie is short enough.
                -Roger Ebert
            </blockquote>
        </>
    )

}