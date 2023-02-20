import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieForm.css';

const MovieForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const [genre, setGenre] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
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
        const genre_id = Number(genre);
        const newMovie = {
            title,
            poster,
            description,
            genre_id
        }
        if (!isInvalid(title, poster, description)) {
            dispatch({
                type: 'POST_MOVIE', 
                payload: newMovie
            });
        setTitle('');
        setPoster('');  
        setDescription('');      
        }
        history.push('/');
    }

    return (
        <>
            <button 
                className="form-visible-button"
                onClick={() => {setFormVisible(!formVisible)}}
            >
                Add Movie Form
            </button>
            <br />
            <br />
            {formVisible && <div className="movie-form">
                <br />
                {/* dispatch to POST function called here */}
                <form onSubmit={onSubmit}>

                    {/* form needs 3 inputs, 1 dropdown: title, poster, description. Dropdown with genre options */}
                    {/* collect movie title here */}
                    <label htmlFor="title">Title: </label>
                    <input 
                        id="title" 
                        name="title"
                        value={title} 
                        placeholder="movie title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    &nbsp; &nbsp; &nbsp; &nbsp; 

                    {/* collect poster link here */}
                    <label htmlFor="poster">Poster link: </label>
                    <input 
                        id="poster" 
                        //name attribute should match html attribute
                        name="poster"
                        value={poster} 
                        placeholder="poster link"
                        onChange={(event) => setPoster(event.target.value)}
                    /> 
                    &nbsp; &nbsp; &nbsp; &nbsp; 

                    {/* collect movie description here */}
                    <label htmlFor="description">Movie description: </label>
                    <input 
                        id="description" 
                        //name attribute should match html attribute
                        name="description"
                        value={description} 
                        placeholder="description link"
                        onChange={(event) => setDescription(event.target.value)}
                    /> 
                    &nbsp; &nbsp; &nbsp; &nbsp;

                    {/* genre dropdown here */}
                    <label>
                        Select a movie genre:
                        <select onChange={(event) => setGenre(event.target.value)}>
                            <option value="1">Adventure</option>
                            <option value="2">Animated</option>
                            <option value="3">Biographical</option>
                            <option value="4">Comedy</option>
                            <option value="5">Disaster</option>
                            <option value="6">Drama</option>
                            <option value="7">Epic</option>
                            <option value="8">Fantasy</option>
                            <option value="9">Musical</option>
                            <option value="10">Romantic</option>
                            <option value="11">Science Fiction</option>
                            <option value="12">Space-Opera</option>
                            <option value="13">Superhero</option>
                        </select>
                        </label>
                    <br />
                    <br />
                    {/* add cancel movie button here */}
                    <button 
                        className="cancel-movie-button"
                        onClick={() => {setFormVisible(!formVisible)}}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* add save movie button here */}
                    <button 
                        type="submit"
                        className="submit-movie-button"
                    >
                        Save Movie
                    </button>
                    <br />
                    <br />
                </form>
            </div>}
        </>
    )
}

export default MovieForm;