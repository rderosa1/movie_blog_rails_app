import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';
import MoviesIndex from './components/Moviesindex';

class App extends Component {
  state = {
    movies: [],
    posts: []
  }

  async componentDidMount(){
    const movies = await readAllMovies
    const posts = await readAllPosts
    this.setState({
      movies,
      posts
    })
  }



  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
      
      <Route Path = '/movies' render={()=> {
        <MoviesIndex
        movies=this.state.movies
        />
      }}/>
      </div>
    );
  }
}

export default App;
