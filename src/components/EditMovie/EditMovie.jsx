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

    const isInvalid = (title, poster, description) => {
        if (title.length <= 0 && description.length <= 0 && poster.length <=0) {
            alert('inputs cannot be blank')
            return true;
        }
        if (title.length <= 0 || description.length <= 0 || poster.length <=0) {
            alert('inputs cannot be blank')
            return true;
        }
        if (description.length <= 0 && poster.length <=0) {
            alert('inputs cannot be blank')
            return true;
        }
        if (title.length <= 0 && poster.length <=0) {
            alert('inputs cannot be blank')
            return true;
        }
        if (title.length <= 0) {
            alert('must enter a movie title')
            return true;
        }
        if (poster.length <= 0){
            alert('must enter a poster')
            return true;
        }
        if (description.length <= 0){
            alert('must enter a description')
            return true;
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const updatedMovie = {
            title,
            description,
        }
        if (!isInvalid(title, description)) {
            dispatch({
                type: 'PUT_MOVIE', 
                payload: updatedMovie
            });
        setTitle(''); 
        setDescription('');      
        }
        history.push('/');
    }

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
                            <textarea 
                                id="title" 
                                name="title"
                                value={title} 
                                defaultValue={movie.title}
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
                        </form>
                    </div>
                )
            })}
        </div>
    )
}

export default EditMovie;