import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies, editMovie, saveEditedMovie, addMovieOptimistic, editMovieOptimistic, cancelEdit } from '../features/moviesSlice';
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
            console.log(editingMovie,"this is editing movie")
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
            movieData._id= editingMovie._id;
            console.log(movieData,"data which is going to be updated")
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




    return (
        <div>
            <form onSubmit={handleAddOrUpdateMovie}>
                {/* Title */}
                <label>
                    Title: <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                {/* Description */}
                <label>
                    Description: <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                {/* Release Year */}
                <label>
                    Release Year: <input type='number'  value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                </label>
                {/* genre */}
                <label>
                    Genre: <input type='text' value={genre} onChange={(e) => setGenre(e.target.value)} />
                </label>
                <button type='submit'>{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
            </form>
        </div>
    )
}

export default Addmovie
