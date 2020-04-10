import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';
import PostsIndex from './components/PostsIndex';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'


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

  //handleSubmit
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }
  //onClick function to go to login page
  handleLoginButton = () => {
    this.props.history.push("/login")
  }

  //handlesubmit


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
          handleSubmit={this.handleLogin}
          handleChange={this.handleChange}
           />)} />

        <Route exact path="/register" render={(props) => (
          <Register
          formData={this.state.formData}
          handleSubmit={this.handleRegister}
          handleChange={this.handleChange}
            />)} />
      </div>
    );
  }
}

export default App;
