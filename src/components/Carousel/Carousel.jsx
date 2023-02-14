import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({movies}) => {

    const [movieIndex, setMovieIndex] = useState(0);
    const history = useHistory();
    const previousIndex = movieIndex === 0 ? movies.length - 1 : movieIndex - 1;
    const nextIndex = movieIndex == movies.length - 1 ? 0 : movieIndex + 1;

    
    if (movies.length === 0) {
        return 'loading...';
    }
    const movie = movies[movieIndex];
    const nextMovie = movies[nextIndex];
    const prevMovie = movies[previousIndex];
    
    const clickHandler = (movie) => {
        console.log('selected movie: ', movie);
        console.log('movie id in click handler: ', movie.id);
        history.push(`/details/${movie.id}`);
    }
    return(
        <div className="carousel">
            <div className="prev-div">
                <button className="prev-button" onClick={() => setMovieIndex(previousIndex)}>
                    <img 
                        src={prevMovie.poster} 
                        alt={prevMovie.title}
                        className="prev-image"
                        // onClick={() => setMovieIndex(previousIndex)}
                    />
                </button>
                {/* <div className = "overlay">
                    <div className="prev-movie-title">{prevMovie.title}</div>
                </div> */}
            <h4>previous</h4>
            </div>

            <div className="movie-div">
                <button className="movie-details-button" onClick={() => {clickHandler(movie)}}> 
                    <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="movie-image"
                    />
                </button>
                <h4>click movie for more info</h4>
            </div>

            <div className="next-div">
                <button className="next-button" onClick={() => setMovieIndex(nextIndex)}>
                    <img 
                        src={nextMovie.poster} 
                        alt={nextMovie.title}
                        className="next-image"
                    />
                </button>
                <h4>next</h4>
            </div>
        </div>
    );
};

export default Carousel