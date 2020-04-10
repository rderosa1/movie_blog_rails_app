const axios = require('axios');
const api = axios.create({
    baseURL: ProcessingInstruction.env.NODE_ENV === 'production' ? 'https://movie-massacre.herokuapp.com/' : 'http://localhost:3000'
})

//====================================
//============== Auth ================
//====================================

export const loginUser = async (loginData) => {
    const resp = await api.post('/auth/login', { auth: loginData })
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    return resp.data.user
  }

  export const registerUser = async (registerData) => {
    const resp = await api.post('/users/', { user: registerData })
    localStorage.setItem('authToken', resp.data.token);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
    return resp.data.user
  }

  export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      const resp = await api.get('/auth/verify');
      return resp.data
    }
    return false
  }

  export const removeToken = () => {
      api.defaults.headers.common.authorization = null
  }


//====================================
//============== Users ===============
//====================================

export const createUser = async (userData) => {
    const resp = await api.post('/user', {user: userData});
    return resp.data
}



//====================================
//============== Movies ==============
//====================================

export const readAllMovies = async () => {
    const resp = await api.get('/movies');
    return resp.data
}

export const readOneMovie = async (id) => {
    const resp = await api.get(`/movie/${id}`);
    return resp.data
}

export const createMovie = async (movieData) => {
    const resp = await api.post('/movie', {movie: movieData});
    return resp.data
}

export const putMovie = async (item, id) => {
    const resp = await api.put(`/movies/${id}`, { movies: item })
    return resp.data
  }

  export const destroyMovie = async (id) => {
    const resp = await api.delete(`/movies/${id}`);
    return resp.data;
  }


//====================================
//============== Posts ===============
//====================================

export const readAllPosts = async () => {
    const resp = await api.get('/posts');
    return resp.data
}


export const readOnePost = async (id) => {
    const resp = await api.get(`/post/${id}`);
    return resp.data
}


export const createPost = async (postData) => {
    const resp = await api.post('/post', {post: postData});
    return resp.data
}


export const destroyPost = async (id) => {
    const resp = await api.delete(`/post/${id}`);
    return resp.data
}