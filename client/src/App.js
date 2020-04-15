import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import { readAllMovies, readAllPosts, readOneMovie, createMovie, putMovie, destroyMovie, destroyPost } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';
import PostsIndex from './components/PostsIndex';
import Login from './components/Login'
import Register from './components/Register'
import { loginUser } from './services/api-helper'
import { registerUser } from './services/api-helper'
import { verifyUser } from './services/api-helper'
import { removeToken } from './services/api-helper'
import { createPost } from './services/api-helper'
import MoviePage from './components/MoviePage'
import { HomePage } from './components/HomePage'
import PostPage from './components/PostPage'
import { withRouter } from 'react-router-dom'
import { Header } from './components/Header'
import UpdatePost from './components/UpdatePost'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      posts: ["This is my very first blog"],
      authFormData: {
        username: "",
        email: "",
        password: ""
      },
      currentUser: null

    }
  }

  //onClick function to go to Sign In page
  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  //onClick function to go to Sign Up page
  handleRegisterButton = () => {
    this.props.history.push("/register")
  }


  //on page load get all movies and posts 
  async componentDidMount() {
    await this.handleVerify()
    const movies = await readAllMovies()
    const posts = await readAllPosts()
    this.setState({
      movies,
      posts
    })
  }

  //================================================
  //==================== Movies ====================
  //================================================

  //already have all  movies from CDM

  //function to get a single movie from movies
  getMovie = async (id) => {
    const oneMovie = await readOneMovie(id);
    this.setState({ oneMovie });
  }

  //function to add a movie to the db
  addMovie = async () => {
    const newMovie = await createMovie(this.state.formData)
    this.setState(prevState => ({
      movies: [...prevState.movie, newMovie],
      formData: {
        name: ""
      }
    }))
  }

  // Function to update an existing Movie
  // setState with prevState and map through the previous array
  // use a ternary to return the updatedMovie for the Movie that was updated.
  updateMovie = async (movieToUpdate) => {
    const updatedMovie = await putMovie(this.state.formData, movieToUpdate.id);
    this.setState(prevState => ({
      movies: prevState.food.map(movie => {
        return movie.id === movieToUpdate.id ? updatedMovie : movie
      })
    }))
  }


  // Function to delete a movie
  // setState with prevState and filter out the deleted movie
  deleteMovie = async (movieToDelete) => {
    await destroyMovie(movieToDelete.id);
    this.setState(prevState => ({
      movies: prevState.movie.filter(movie => movie.id !== movieToDelete.id)
    }))
  }

  //handlechange for creating movies function
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }


  //================================================
  //==================== Posts =====================
  //================================================

  // have all posts from CDM

  // function to create a new post
  addPost = async (newPost) => {
    this.setState(prevState => ({
      posts: [...prevState.posts, newPost],
      formData: {
        content: ""
      }
    }))
    this.props.history.push('/movies')
  }

  //delete a post
  deletePost = async (postId) => {
    await destroyPost(postId)
    this.setState((prevState) => ({ 
        posts: prevState.posts.filter((post)=> {
          return postId !== post.id
        })
    }))
    this.props.history.push('/movies')
  }


  //================================================
  //==================== auth ======================
  //================================================

  // Function to login a user
  // user data set in state.
  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser })
    this.props.history.push('/')
  }


  // Function to register a user
  // user data set in state.
  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser })
    this.props.history.push('/')
  }

  //Function to verify a user
  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }
  // Function to logout user
  // We delete the token from local storage
  // set the current user in state back to null
  // and call our remove token function to remove
  // the auth headers from our api call
  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
    removeToken();
  }


  // Handle change function for auth forms
  authHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  //================================================
  //==================== render ====================
  //================================================


  render() {
    console.log(this.state.currentUser)
    return (
      <div className="App">
        <Header />

        {/* <Link to="/movies">View All Movies</Link> */}
        <Route exact path="/">
          {this.state.currentUser
            ?
            <div>
              {/* Greet user if there is user info set in state. */}
              <h3>Welcome, {this.state.currentUser && this.state.currentUser.email}<button onClick={this.handleLogout}>logout</button></h3>
              <Link to="/movies"><span className="view">View All Movies</span></Link>
              &nbsp;
              <Link to="/posts"><span className="view">View All Posts</span></Link>
              <hr />
            </div>
            :
            <>
              <Link to="/login"><button onClick={this.handleLoginButton}>Sign In</button></Link>
              <Link to="/register"><button onClick={this.handleRegisterButton}>Sign Up</button></Link>
            </>
          }
        </Route>

        <Switch>

          {/* Route to movies */}
          <Route exact path="/movies/:title/posts"
            render={(props) =>
              <PostPage {...props} posts={this.state.posts}
                movies={this.state.movies}
                currentUser={this.state.currentUser}
                addPost={this.addPost}
              />
            }
          />
          <Route exact path="/movies"
            render={(props) =>
              <MoviesIndex {...props} movies={this.state.movies} />
            }
          />
          <Route exact path="/posts"
            render={(props) =>
              <PostsIndex {...props} posts={this.state.posts} />
            }
          />

          <Route exact path="/login" render={(props) => (
            <Login
              formData={this.state.authFormData}
              handleLogin={this.handleLogin}
              handleChange={this.authHandleChange}
            />)} />

          <Route exact path="/register" render={(props) => (
            <Register
              formData={this.state.authFormData}
              handleChange={this.authHandleChange}
              handleRegister={this.handleRegister}
            />)} />

          <Route exact path="/movies/:id" render={(props) => (
            <MoviePage
              {...props}
              movies={this.state.movies}
            />
          )}
          />

          <Route exact path="/posts/:id" render={(props) => (
            <UpdatePost
              {...props}
              posts={this.state.posts}
              addPost = {this.addPost}
              deletePost = {this.deletePost}
            />
          )}
          />

        </Switch>

      </div>
    );
  }
}

export default withRouter(App);