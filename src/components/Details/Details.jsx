import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
    const { id } = useParams();
    const selectedMovie = useSelector(store => store.selectedMovie);
    const genres = useSelector(store => store.genres);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log('selectedMovie on details page: ', selectedMovie);
    console.log('selectedMovie.title: ', selectedMovie.title);

    // fire off fetch movie and fetch genres get requests on page load
    useEffect(()=> {
        dispatch({
            type: 'FETCH_MOVIE_DATA', 
            payload: id
        });
        dispatch({
            type: 'FETCH_GENRES',
            payload: id
        })
    }, [id]);

    const clickHandler = (movie) => {
        history.push(`/edit/${movie.id}`)
    };

    return (
        <>
            <div>
                {/* map over selected movie to display movie data */}
                {selectedMovie.map(movie => {
                    return(
                        <div className="movie-info-container">
                            <div className="movie-title-poster">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title}
                                    height="500px"
                                />
                            </div>
                            <div>
                                <div className="movie-description">
                                    <h1 className="movie-title">{movie.title}</h1>
                                    <section className="about-header"><b>About this movie:</b></section>
                                    <section className="movie-description">{movie.description}</section>
                                </div>
                                <br />
                                <br />
                                
                                {/* map over genres to display genre data */}
                                <div className="genres-container">
                                    <section className="genres-header"><b>Genres:</b></section>
                                    {genres.map(genre => {
                                        return (
                                            <section className="movie-genres">
                                                {genre.genres}
                                            </section>
                                        );
                                    })}
                                </div>
                                <br />
                                <br />
                                <button
                                    className="edit-movie-button"
                                    onClick={() => {clickHandler(movie)}}
                                >
                                    Edit movie
                                </button>

                            </div>
                        </div>
                    )
                })}
            </div>
            <br />
            <br />
            <button className="home-button" onClick={() => {history.push('/')}}><span>Back to movie list</span></button>
        </>
    )
}

export default Details;