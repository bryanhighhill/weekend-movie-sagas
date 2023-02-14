import {useState} from 'react';

const MovieSlider = ({movies}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log('in movie slider with', movies);

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgoundImage: `url(${movies[currentIndex].poster})`, 
    }

    return (
        <div>
            <div style={slideStyles}>

            </div>
        </div>
    )
}

export default MovieSlider;