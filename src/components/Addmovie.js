import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies, editMovie, addMovieOptimistic, editMovieOptimistic, cancelEdit } from '../features/moviesSlice';
import { v4 as uuidv4 } from 'uuid';

const Addmovie = () => {
    const dispatch = useDispatch();
    const editingMovie = useSelector((state) => state.movies.editingMovie); // Read editingMovie from Redux state

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');
    const [_id, setId] = useState(0)


    useEffect(() => {
        if (editingMovie) {
            setTitle(editingMovie.title || '');
            setDescription(editingMovie.description || '');
            setReleaseYear(editingMovie.releaseYear || '');
            setGenre(editingMovie.genre || '');
        }
    }, [editingMovie]);

    const handleAddOrUpdateMovie = (e) => {
        e.preventDefault();
        const movieData = { title, description, releaseYear, genre };
        if (editingMovie) {
            movieData._id = editingMovie._id;
            dispatch(editMovieOptimistic(movieData));
            dispatch(editMovie(movieData));
            dispatch(cancelEdit());
        } else {
            dispatch(addMovieOptimistic(movieData));
            dispatch(addMovies(movieData));
        }
        // Reset form fields
        setTitle('');
        setDescription('');
        setReleaseYear('');
        setGenre('');
    };

    function handleCancelEditing(){
        dispatch(cancelEdit);
    }



    return (
        <div className='form-div'>
        <h2>Add Movie</h2>
            <form onSubmit={handleAddOrUpdateMovie} >

                <div>
                    <label>
                        Title:
                    </label>
                    <label>
                        Release Year:
                    </label>
                </div>

                <div>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type='number' value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />

                </div>


                <div>
                    <label>
                        Description:
                    </label>
                    <label>
                        Genre:
                    </label>
                </div>
                <div>
                    <textarea type='text' maxLength="50" rows={1} cols={20} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type='text' value={genre} onChange={(e) => setGenre(e.target.value)} />

                </div>
                <button type='submit' className='btn'>{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
                {
                    editingMovie && <button onClick={handleCancelEditing} className='btn cncl-btn'>Cancel</button>
                }
            </form>
        </div>
    )
}

export default Addmovie
