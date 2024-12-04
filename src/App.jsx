import './App.css';  // Import the CSS file
import Search from "./assets/search-512.webp"
import {useState} from 'react'
import MovieCard from './MovieCard';


// Api Url from OMDB





function App() {

const [movies, setMovies] = useState([])
const [searchTerm, setSearchTerm] = useState("")

const url = 'https://www.omdbapi.com/?&apikey=37410f16';

// const searchMovies = async (title) =>{
//   const response = await fetch(`${url}&s=${title}`)
//   const data = await response.json();
//   console.log(data) ;
  
//   const movie = data?.Search || []; 
//   console.log(movie,"get movies");
//   setMovies(movie.search)
  
// }
const searchMovies = async (title) => {
  if (title === "") return; // Don't search if the input is empty

  const response = await fetch(`${url}&s=${title}`);
  const data = await response.json();

  if (data?.Search) {
    setMovies(data.Search); // Set the array of movies to the state
  } else {
    setMovies([]); // Set empty array if no results found
  }
};

  
  return (
    <div className="App">

      <h1>Movie Finder</h1>
      <div className='search'>
      <input
          type="text"
          placeholder='Search Here...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>

         <img src={Search} alt=" Search Icon" onClick={()=>
          searchMovies(searchTerm)} />

      </div>

      {movies?.length >0 ? (
<div className='container'>

  {movies.map((movie,index)=> (
     <MovieCard key={index} movie={movie}/>
  ))}

</div>
      ): (

      <div className='empty'>
      <h2>Search For Your Favorite Movies & TV Series.</h2>
    </div>
      )}     
    </div>
  );
}

export default App;
