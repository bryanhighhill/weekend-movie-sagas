import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import Carousel from '../Carousel/Carousel';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);        

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <Carousel movies={movies}/>
        </main>

    );
}

export default MovieList;