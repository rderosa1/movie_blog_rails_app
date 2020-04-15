import React from 'react'
import { putPost, readOnePost, destroyPost } from '../services/api-helper'


export default class UpdatePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content:'',
            id: null
        }
    }

    componentDidMount(){
        this.getPost(this.props.match.params.id)
    }

    getPost = async (postId) => {
        const post = await readOnePost(postId)
        console.log(post)
        this.setState({
            content: post.content,
            id : post.id
        })
    }

    handleChange = (e) => {
        const { value } = e.target
        this.setState({
            content:value
        })
    }

    handleSubmit = async (e, oneMovie) => {
        console.log('test')
        e.preventDefault()
        let response = await putPost({content:this.state.content}, this.state.id)
        this.props.addPost(response)
        console.log(response)
    }

    

    render() {
        return (
            <>
                <h3>Update Page</h3>
                <form onSubmit={(e)=>this.handleSubmit(e)}>

                    <textarea onChange={this.handleChange} name="content" value={this.state.content} rows = "10" cols = "50"> </textarea>
                    <button onClick={this.handleSubmit}> UPDATE this blog </button>

                </form>
                <button onClick={()=>this.props.deletePost(this.state.id)}> Delete this blog </button>
            </>
        )
    }

}