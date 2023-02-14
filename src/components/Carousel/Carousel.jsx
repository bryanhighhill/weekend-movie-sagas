import { useState } from 'react';

const Carousel = ({movies}) => {

    const [movieIndex, setMovieIndex] = useState(0);
    const previousIndex = movieIndex === 0 ? movies.length - 1 : movieIndex - 1;
    const nextIndex = movieIndex == movies.length - 1 ? 0 : movieIndex + 1;

    if (movies.length === 0) {
        return 'loading...';
    }
    const movie = movies[movieIndex];
    const nextMovie = movies[nextIndex];
    const prevMovie = movies[previousIndex];

    return(
        <div className="carousel">
            <button className="prev-button" onClick={() => setMovieIndex(previousIndex)}>Previous</button>
            <h1>
                {movie.title}
            </h1>
            <button className="next-button" onClick={() => setMovieIndex(nextIndex)}>Next</button>
        </div>
    );
};

export default Carousel