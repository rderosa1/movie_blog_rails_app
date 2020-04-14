import React from 'react'
import { Header } from './Header'
import Nav from './Nav'

export const HomePage = (props) => {
    return (
        <>
            <div className = "homepage">
                <blockquote>
                    "No good movie is too long, and no bad movie is short enough."
                    <br/>
                    <span className = "roger">-Roger Ebert</span>
                </blockquote>
            </div>
        </>
    )

}