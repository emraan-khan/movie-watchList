import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovies, editMovie, saveEditedMovie } from '../features/moviesSlice';

const Addmovie = () => {
    const dispatch = useDispatch();
    const editingMovie = useSelector((state) => state.movies.editingMovie); // Read editingMovie from Redux state

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [genre, setGenre] = useState('');

    const handleAddOrUpdateMovie = (e) => {
        e.preventDefault();
        if (editingMovie) {
            // Update existing movie
            dispatch(
                saveEditedMovie({
                    id: editingMovie.id,
                    title,
                    description,
                    releaseYear,
                    genre,
                })
            );
        } else {
            // Add new movie
            dispatch(
                addMovies({
                    title,
                    description,
                    releaseYear,
                    genre,
                })
            );
        }

        // Reset form fields
        setTitle('');
        setDescription('');
        setReleaseYear('');
        setGenre('');
    };


    useEffect(() => {
        if (editingMovie) {
            setTitle(editingMovie.title || '');
            setDescription(editingMovie.description || '');
            setReleaseYear(editingMovie.releaseYear || '');
            setGenre(editingMovie.genre || '');
        } else {
            setTitle('');
            setDescription('');
            setReleaseYear('');
            setGenre('');
        }
    }, [editingMovie]);

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
                    Release Year: <input type='number' value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                </label>
                {/* genre */}
                <label>
                    Genre: <input type='text'value={genre} onChange={(e) => setGenre(e.target.value)} />
                </label>
                <button type='submit'>{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
            </form>
        </div>
    )
}

export default Addmovie
