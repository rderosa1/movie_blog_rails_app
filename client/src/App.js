import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';
import PostsIndex from './components/PostsIndex';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { loginUser } from './services/api-helper'
import { registerUser } from './services/api-helper'
import { verifyUser } from './services/api-helper'
import { removeToken } from './services/api-helper'
import { createPost} from './services/api-helper'


class App extends Component {
  state = {
    movies: [],
    posts: ["this is my first post"],
    formData:{username:"", 
      email:"", 
      passowrd:""}
  }

  async componentDidMount() {
    const movies = await readAllMovies()
    const posts = await readAllPosts()
    this.setState({
      movies,
      posts
    })
  }

  //================================================
  //==================== Posts =====================
  //================================================

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



  //handleSubmit
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }
  //onClick function to go to login page
  handleLoginButton = () => {
    this.props.history.push("/login")
  }


  //================================================
  //==================== auth ======================
  //================================================

  // Function to login a user
  // we set the user data in state.
  handleLogin = async () => {
    const currentUser = await loginUser(this.state.authFormData);
    this.setState({ currentUser })
  }

  // Function to register a user
  // we set the user data in state.
  handleRegister = async (e) => {
    e.preventDefault();
    const currentUser = await registerUser(this.state.authFormData);
    this.setState({ currentUser })
  }


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
        <h1>this is App</h1>

        <Route path="/movies"
          render={(props) =>
            <MoviesIndex {...props} movies={this.state.movies} />
          }
        />

        <Route path="/posts"
          render={(props) =>
            <PostsIndex {...props} posts={this.state.posts} />
          }
        />

        <Route exact path="/">
          <Home />
        </Route>

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

      </div>
    );
  }
}

export default App;
