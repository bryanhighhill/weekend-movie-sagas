import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Details = () => {
    const selectedMovie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    const history = useHistory();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const movieId = selectedMovie.id;
    //     dispatch({
    //         type: 'FETCH_GENRES', 
    //         payload: movieId
    //     });
    // })

    return (
        <div>
            <main>
                <h1 className="movie-title">{selectedMovie.title}</h1>
                <img 
                    src={selectedMovie.poster} 
                    alt={selectedMovie.title}
                />
                {genres.map(genre => {
                    return (
                        <div>
                            <h3>{genre.genres}</h3>
                        </div>
                    );
                })}
                <br />
                <br />
                <section className="about-header"><b>About this movie:</b></section>
                <section className="movie-description">{selectedMovie.description}</section>
            </main>
            <br />
            <br />
            <button className="home-button" onClick={() => {history.push('/')}}>Back to movie list</button>
        </div>
    )
}

export default Details;