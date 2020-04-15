import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/movies">
                    <li>Movies</li>
                </Link>
                <Link to="/posts">
                    <li>Post a Blog</li>
                </Link>
            </ul>
        </nav>
    )

}