import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';

function App() {
  return (
    <div className="App">
      <h1 className="movie-header">Movie Selector</h1>

      {/* ROUTER PATH FOR HOME PAGE */}
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* ROUTER PATH FOR MOVIE DETAILS PAGE */}
        <Route path="/details/:id">
          <Details />
        </Route>
      </Router>

      {/* ROUTER PATH FOR EDIT MOVIE PAGE */}
      <Route path="/edit/:id">
          <EditMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
