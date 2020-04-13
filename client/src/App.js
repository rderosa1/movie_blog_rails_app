import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import { readAllMovies, readAllPosts, readOneMovie, createMovie, putMovie, destroyMovie } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';
import PostsIndex from './components/PostsIndex';
import Login from './components/Login'
import Register from './components/Register'
import { loginUser } from './services/api-helper'
import { registerUser } from './services/api-helper'
import { verifyUser } from './services/api-helper'
import { removeToken } from './services/api-helper'
import { createPost } from './services/api-helper'
import MoviesPage from './components/MoviePage'
import { HomePage } from './components/HomePage'


class App extends Component {
  state = {
    movies: [],
    posts: ["this is my first post"],
    formData: {
      username: "",
      email: "",
      password: ""
    },
      currentUser: null
    
  }

  //onClick function to go to login page
  handleLoginButton = () => {
    this.props.history.push("/login")
  }


  //on page load get all movies and posts 
  async componentDidMount() {
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


  //function to add a post to a movie



  //function to create a new post
  addPost = async () => {
    const newPost = await createPost(this.state.formData)
    this.setState(prevState => ({
      post: [...prevState.food, newPost],
      formData: {
        content: ""
      }
    }))
  }

  //handleChange for post


  //================================================
  //==================== auth ======================
  //================================================

  // Function to login a user
  // user data set in state.
  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser })
  }

  // Function to register a user
  // user data set in state.
  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser })
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
    return (
      <div className="App">
        <HomePage />

        {/* <Link to="/movies">View All Movies</Link> */}
        {this.state.currentUser
          ?
          <div>
            {/* Greet user if there is user info set in state. */}
            <h3>Welcome, {this.state.currentUser && this.state.currentUser.email}<button onClick={this.handleLogout}>logout</button></h3>
            <Link to="/movies">View All Movies</Link>
              &nbsp;
              <Link to="/posts">View All Posts</Link>
            <hr />
          </div>
          :
          <button onClick={this.handleLoginButton}>Login/register</button>
        }

        <Switch>

          {/* Route to movies */}
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
              formData={this.state.formData}
              handlelogin={this.handleLogin}
              handleChange={this.authHandleChange}
            />)} />

          <Route exact path="/register" render={(props) => (
            <Register
              formData={this.state.authFormData}
              handleChange={this.authHandleChange}
              handleRegister={this.handleRegister}
            />)} />

            <Route exact path="/movies/:id" render={(props) => (
              <MoviesPage 
              {...props} 
              movies = {this.state.movies}
              />
            )}
            />

        </Switch>

      </div>
    );
  }
}

export default App;