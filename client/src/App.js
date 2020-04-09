import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';

class App extends Component {
  state = {
    movies: ["The Fall", "Stranger Things"],
    posts: []
  }

  async componentDidMount(){
    const movies = await readAllMovies()
    const posts = await readAllPosts()
    this.setState({
      movies,
      posts
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
      
        <Route path="/movies"
        render ={(props) =>
        <MoviesIndex {...props} movies={this.state.movies}/>
        }
        />
      </div>
    );
  }
}

export default App;
