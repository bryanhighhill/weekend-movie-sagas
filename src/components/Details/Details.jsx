import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Details = () => {
    const selectedMovie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log('selectedMovie on details page: ', selectedMovie);
    console.log('selectedMovie.title: ', selectedMovie.title);

    return (
        <div>
            <main>
                {selectedMovie.map(movie => {
                    return(
                        <div className="movie-title-poster">
                            <h1 className="movie-title">{movie.title}</h1>
                            <img 
                                src={movie.poster} 
                                alt={movie.title}
                            />
                        </div>
                    )
                })}
                {genres.map(genre => {
                    return (
                        <div className="movie-genres">
                            <h3>{genre.genres}</h3>
                        </div>
                    );
                })}
                <br />
                <br />
                {selectedMovie.map(movie => {
                    return(
                        <div className="movie-description">
                            <section className="about-header"><b>About this movie:</b></section>
                            <section className="movie-description">{movie.description}</section>
                        </div>
                    )
                })}
            </main>
            <br />
            <br />
            <button className="home-button" onClick={() => {history.push('/')}}>Back to movie list</button>
        </div>
    )
}

export default Details;