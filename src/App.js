import './App.css';
import Addmovie from './components/Addmovie';
import MoviesList from './components/MoviesList';
function App() {
  return (
    <div className="App">
      movie list app
      <Addmovie />
      <MoviesList />
    </div>
  );
}

export default App;
