import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/movies';



// thunk function to perform impure js function
export const fetchMovies = createAsyncThunk('movies/fetchMovie', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addMovies = createAsyncThunk('movies/addMovie', async (movie) => {
  console.log(movie);
  const response = await axios.post(`${API_URL}/add`, movie);
  console.log("res",response.data)
  return response.data;
})

export const editMovie = createAsyncThunk('movies/editMovie', async (movie) => {
  const response = await axios.put(`${API_URL}/${movie._id}`, movie);
  console.log("message",response.data.message);
  return response.data;
})

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  console.log('inside delete function', id)
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleWatched = createAsyncThunk('movies/toggleWatched', async (id) => {
  const response = await axios.patch(`${API_URL}/toggle/${id}`);
  return response.data;
});


const initialState = {
  movies: [],
  editingMovie: null, // Initially no movie is being edited
  status: 'idle',
  error: null
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setEditingMovie: (state, action) => {
      console.log(action.payload);
      state.editingMovie = action.payload;
    },
    cancelEdit: (state, action) => {
      state.editingMovie = null; // Clear editing state on cancel
    },
    addMovieOptimistic:(state, action) => {
      state.movies.push(action.payload);
    },
    editMovieOptimistic: (state, action) => {
      const updatedMovie = action.payload;
      const index = state.movies.findIndex((movie) => movie._id === updatedMovie._id);

      if (index !== -1) {
        // Use Immer's produce to update the state immutably
        state.movies = state.movies.map((movie, idx) =>
          idx === index ? { ...movie, ...updatedMovie } : movie
        );
      }
    },
    deleteMovieOptimistic: (state, action) => {
      console.log(action.payload,"this is action id for delete");
      // state.movies = state.movies.filter((movie) => movie._id !== action.payload);
    },
    toggleWatchedOptimistic:(state, action) => {
      const movieId = action.payload; // Assuming payload is the movie _id

      // Find the index of the movie in the array
      const index = state.movies.findIndex(movie => movie._id === movieId);
    
      // Toggle the watched status if the movie is found
      if (index !== -1) {
        // Create a new array with updated movie object
        const updatedMovies = state.movies.map(movie =>
          movie._id === movieId ? { ...movie, watched: !movie.watched } : movie
        );
    
        // Return a new state object with updated movies array
        return {
          ...state,
          movies: updatedMovies
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.data;
        console.log(state.movies, "here is movie")
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovies.fulfilled, (state, action) => {
        console.log(action.payload,"jhgjgjfhgdghfdg")
        // state.movies.push(action.payload);
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie._id === action.payload.message._id);
        console.log(action.payload.message._id)
        if (index !== -1) {
          state.movies[index] = action.payload.message;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie._id !== action.payload);
        console.log('movies after delete', state.movies)
      })
  }
})

export const { saveEditedMovie, cancelEdit,addMovieOptimistic,deleteMovieOptimistic,toggleWatchedOptimistic,editMovieOptimistic,setEditingMovie } = moviesSlice.actions;
export default moviesSlice.reducer;