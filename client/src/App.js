import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { readAllMovies, readAllPosts } from './services/api-helper';
import MoviesIndex from './components/MoviesIndex';
import PostsIndex from './components/PostsIndex';

class App extends Component {
  state = {
    movies: [],
    posts: ["this is my first post"]
  }

  async componentDidMount() {
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
          render={(props) =>
            <MoviesIndex {...props} movies={this.state.movies} />
          }
        />

        <Route path="/posts"
          render={(props) =>
            <PostsIndex {...props} posts={this.state.posts} />
          }
        />

        {/* <Route path="/">
          <App />
        </Route> */}
      </div>
    );
  }
}

export default App;
