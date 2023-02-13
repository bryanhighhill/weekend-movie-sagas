import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);        
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const clickHandler = (movie) => {
        return (
            console.log('selected movie: ', movie),
            dispatch({
                type: 'FETCH_MOVIE_DATA', 
                payload: movie.id
            }),
            dispatch({
                type: 'FETCH_GENRES',
                payload: movie.id
            }),
            console.log('movie id in click handler: ', movie.id),
            history.push('/details')
        )
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                                onClick={()=> {clickHandler(movie)}}
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;