import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditMovie.css';

const EditMovie = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedMovie = useSelector(store => store.selectedMovie);
    const history = useHistory();

    // fire off fetch movie and fetch genres get requests on page load
    useEffect(()=> {
        dispatch({
            type: 'FETCH_MOVIE_DATA', 
            payload: id
        })
    }, [id]);

    const onSubmit = (event) => {
        event.preventDefault();
        const updatedMovie = {
            title,
            description,
            id
        }
        dispatch({
            type: 'UPDATE_MOVIE', 
            payload: updatedMovie
        });   
        history.push(`/details/${id}`)
    };

    return (
        <div>
            {selectedMovie.map(movie => {
                return (
                    <div className="edit-movie-div">
                        <br />
                        <p>editing details for:
                            <br />
                            <element className="movie-title">
                                <b>{movie.title}</b>
                            </element>
                        </p>
                        <img src={movie.poster}/>
                        <form onSubmit={onSubmit}>
                            <br />
                            {/* collect movie title update here */}
                            <label htmlFor="title"><b>Edit Title:</b></label>
                            <br />
                            <input
                                id="title" 
                                name="title"
                                value={title} 
                                placeholder={movie.title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <br /> 
                            <br />
                            {/* collect movie description update here */}
                            <label htmlFor="description">
                                <b>Edit Movie Description:</b>
                            </label>
                            <textarea
                            // <input 
                                id="description"
                                type="textarea"
                                className="description-input" 
                                name="description"
                                defaultValue={movie.description}
                                rows={9}
                                
                                wrap="soft"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <br />
                            <br />
                            {/* add cancel movie button here */}
                            <button 
                                className="cancel-movie-button"
                                onClick={() => {history.push(`/details/${id}`)}}
                            >
                                Cancel
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {/* add save movie button here */}
                            <button 
                                type="submit"
                                className="submit-movie-button"
                            >
                                Update Movie
                            </button>
                        </form>
                    </div>
                )
            })}
        </div>
    )
}

export default EditMovie;