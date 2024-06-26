import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWatched, deleteMovie,editMovie, fetchMovies,toggleWatchedOptimistic, deleteMovieOptimistic,setEditingMovie } from '../features/moviesSlice';

const MoviesList = () => {
  const {movies, deleting} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(()=>{
    dispatch(fetchMovies());
  },[dispatch]);

  const handleToggleWatched = (id) => {
    console.log(id);
    dispatch(toggleWatchedOptimistic(id));
    dispatch(toggleWatched(id));
};

const handleDeleteMovie = (id) => {
  console.log('movie list',id)
  dispatch(deleteMovieOptimistic(id));
  dispatch(deleteMovie(id));
};

  const handleEditClick = (movie) => {
    console.log(movie);
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
            <ul>
                {movies.map((movie,key) => (
                    <li key={key}>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <p>Release Year: {movie.releaseYear}</p>
                        <p>Genre: {movie.genre}</p>
                        <p>Status: {movie.watched ? 'Watched' : 'Unwatched'}</p>
                        <button onClick={() => handleToggleWatched(movie._id)}>
                            Mark as {movie.watched ? 'Unwatched' : 'Watched'}
                        </button>
                        <button onClick={() => handleEditClick(movie)}>Edit</button>
                        <button onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
);
};

export default MoviesList;
