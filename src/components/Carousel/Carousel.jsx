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
            <div className="prev-container">
                <button className="prev-button" onClick={() => setMovieIndex(previousIndex)}>
                    <img 
                        src={prevMovie.poster} 
                        alt={prevMovie.title}
                        className="prev-image"
                    />
                </button>
                <br />
                <br />
                <img
                    src="images/prev-button-01.png"
                    width= "150px"  
                    onClick={() => setMovieIndex(previousIndex)}  
                />
            </div>

            <div className="movie-container">
                <button className="movie-details-button" onClick={() => clickHandler(movie)}> 
                    <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="movie-image"
                    />
                </button>
                <br />
                <br />
                <img
                    src="images/more-info-button-01.png"
                    width= "150px"  
                    onClick={() => clickHandler(movie)}  
                />
            </div>

            <div className="next-container">
                <button className="next-button" onClick={() => setMovieIndex(nextIndex)}>
                    <img 
                        src={nextMovie.poster} 
                        alt={nextMovie.title}
                        className="next-image"
                    />
                </button>
                <br />
                <br />
                <img
                    src="images/next-button-01.png"
                    width= "150px"  
                    onClick={() => setMovieIndex(nextIndex)}  
                />
            </div>
        </div>
    );
};

export default Carousel