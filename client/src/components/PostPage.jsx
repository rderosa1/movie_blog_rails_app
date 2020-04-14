import React from 'react'
import { Link } from 'react-router-dom'
import { createPost } from '../services/api-helper'

class PostPage extends React.Component {
    state = {
        posts: {
            content: "",
            user_id: this.props.currentUser && this.props.currentUser.id
        }

    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState(prevState => ({
            posts: {
                ...prevState.posts,
                [name]: value
            }

        }))
    }

    handleSubmit = async (e, oneMovie) => {
        console.log('test')
        e.preventDefault()
        let body = {...this.state.posts, movie_id:oneMovie.id}
        let response = await createPost(body, oneMovie.id)
        console.log(response)
    }

    componentDidMount(){
        // this.setState({
        //     oneMovie:oneMovie
        // })
    }

    render() {
        const oneMovie = this.props.movies.length !== 0 && this.props.movies.find((movie) => (
            this.props.match.params.title == movie.title
        ))  
        console.log(this.state.posts)
        return (
            <>

                <h1>Dummy Data</h1>
                {this.oneMovie &&
                    <div>
                        <p>{this.oneMovie.title}</p>
                    </div>
                }
                <form onSubmit={(e)=>this.handleSubmit(e, oneMovie)}>

                    <textarea onChange={this.handleChange} name="content" value={this.state.value}> </textarea>
                    <button onClick={this.handleClick}> Post THIS blog </button>

                </form>

            </>
        )
    }
}

export default PostPage;