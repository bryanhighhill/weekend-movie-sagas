import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({movies}) => {

    const history = useHistory();
    // Variable for current/default movie index value
    const [movieIndex, setMovieIndex] = useState(0);
    // Variable for previous movie index value
    const previousIndex = movieIndex === 0 ? movies.length - 1 : movieIndex - 1;
    //Variable for next movie index value
    const nextIndex = movieIndex == movies.length - 1 ? 0 : movieIndex + 1;

    //conditional for potential loading time
    if (movies.length === 0) {
        return 'loading...';
    }

    //Variables for getters
    const movie = movies[movieIndex];
    const nextMovie = movies[nextIndex];
    const prevMovie = movies[previousIndex];
    
    //Click handler to take selected movie and bring you to details page for that movie using ID
    const clickHandler = (movie) => {
        history.push(`/details/${movie.id}`);
    }

    return(
        <div className="carousel">

            {/* Previous movie carousel feature */}
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

            {/* selected movie carousel feature */}
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

            {/* next movie carousel feature */}
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