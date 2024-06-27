import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWatched, deleteMovie,editMovie, fetchMovies,toggleWatchedOptimistic, deleteMovieOptimistic,setEditingMovie } from '../features/moviesSlice';
import foto from '../picture.png'

const MoviesList = () => {
  const {movies, deleting} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(()=>{
    dispatch(fetchMovies());
  },[dispatch]);

  const handleToggleWatched = (id) => {
    dispatch(toggleWatchedOptimistic(id));
    dispatch(toggleWatched(id));
};

const handleDeleteMovie = (id) => {
  dispatch(deleteMovieOptimistic(id));
  dispatch(deleteMovie(id));
};

  const handleEditClick = (movie) => {
    dispatch(setEditingMovie(movie));
  };

  const handleCancelEdit = () => {
    setEditMovieId(null);
  };

  const handleSaveMovie = (editedMovie) => {
    dispatch(editMovie(editedMovie));
    setEditMovieId(null); // Clear edit mode after saving
  };

  return (
    <div>
        <h2>My Movie Watchlist</h2>
        {movies.length === 0 ? (
            <p>No movies added yet.</p>
        ) : (
            <div className='movie-container'>
                {movies.map((movie,key) => (
                    <div key={key} className='movie-card'>
                    <img  src={foto} className='movie-img' />
                        <p className="b">{movie.title}</p>
                        <p className='s' >{movie.description}</p>
                        <p className='s' >Release Year: {movie.releaseYear}</p>
                        <p className='s' >Genre: {movie.genre}</p>
                        <p>Status: {movie.watched ? 'Watched' : 'Unwatched'}</p>
                        <button className='toggle-btn' onClick={() => handleToggleWatched(movie._id)}>
                            Mark as {movie.watched ? 'Unwatched' : 'Watched'}
                        </button>
                        <br></br>
                        <button className='edit-btn' onClick={() => handleEditClick(movie)}>Edit</button>
                        <button className='dlt-btn' onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
                    </div>
                ))}
            </div>
        )}
    </div>
);
};

export default MoviesList;
