import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/movies';



// thunk function to perform impure js function
export const fetchMovies = createAsyncThunk('movies/fetchMovie', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addMovies = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
})

export const editMovie = createAsyncThunk('movies/editMovie', async (movie) => {
  const response = await axios.put(`${API_URL}/${movie.id}`, movie);
  return response.data;
})

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  console.log('inside delete function',id)
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleWatched = createAsyncThunk('movies/toggleWatched', async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/toggleWatched`);
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
      state.editingMovie = action.payload;
  },
    cancelEdit: (state, action) => {
      state.editingMovie = null; // Clear editing state on cancel
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
        console.log(state.movies,"here is movie")
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovies.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
        console.log('movies after delete',state.movies)
      })
      .addCase(toggleWatched.fulfilled, (state, action) => {
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      });
  }
})

export const { saveEditedMovie, cancelEdit } = moviesSlice.actions;
export default moviesSlice.reducer;