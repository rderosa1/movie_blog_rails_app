import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';

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
      }}/>
      </div>
    );
  }
}

export default App;
