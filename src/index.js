import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator functions
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('FETCH_MOVIE_DATA', fetchMovieData);
    yield takeEvery('POST_MOVIE', postMovie);
    yield takeEvery('UPDATE_MOVIE', updateMovie);
}

//PUT movie - update movie title and/or description
const updateMovie = (action) => {
    const title = action.payload.title;
    const description = action.payload.description;
    const id = action.payload.id;
    console.log(`in PUT with - title: ${title}, description: ${description}, id: ${id}`);

    axios({
        method: 'PUT',
        url: '/api/movie',
        data: {
            title,
            description,
            id
        }
    })
    .then((response) => {
        console.log('response from updateMovie: ', response);
        fetchAllMovies();
    })
    .catch((error) => {
        console.log('error with updateMovie: ', error);
    })
}

//POST new movie
const postMovie = (action) => {
    const title = action.payload.title;
    const poster = action.payload.poster;
    const description = action.payload.description;
    const genre_id = Number(action.payload.genre_id);

    axios({
        method: 'POST',
        url: '/api/movie',
        data: {
            title,
            poster,
            description,
            genre_id
      }
    })
    .then((response) => {
      console.log('response from postMovie: ', response);
    })
    .catch((error) => {
      console.log('error with postMovie: ', error);
    })
  }

  //POST genre



// get all movies from db
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

//fetch selected movie data from db
function* fetchMovieData(action) {
    const id = action.payload;
    console.log('in * fetchMovieData with id: ', action.payload);
    try {
        const selectedMovieData = yield axios.get(`/api/movie/${id}`);
        yield put({type: 'SET_SELECTED_MOVIE', payload: selectedMovieData.data});
    } catch {
        console.log('error with fetch selected movie data');
    }
}

// get movie genres from db
function* fetchGenres(action) {
    console.log(' in fetch genres with id: ', action.payload);
    const id = action.payload;
    try {
        const genres = yield axios.get(`/api/genre/${id}`);
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch {
        console.log('error with fetch genres: ');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//used to store clicked on movie data
const selectedMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':

            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
