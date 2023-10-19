// Global Variable -- Temporary --
const API_Key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2UxMzhkOTg1YTUwNzczZTQ1MDMxZmJiMGY1MjNlOCIsInN1YiI6IjYyMjhjZWU2ZTkyZDgzMDA0ODQyNThkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1CX_lKBbqeBoKBr2SKyJ46oV3iwsr_aUWWlM5XoMDAs"

// calls the API to get the movies
async function getMovies() {
  try {
    
    //  calls out to the API with the API_Key
    let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        'Authorization': `Bearer ${API_Key}`
      }
    });

    // return a JSON Object
    let data = await response.json();

    // returning the JSON Object
    return data;

  }
  catch (error) {

    console.error(error);
  }
}

// get a single movie
async function getMovie(id) {
	try {
	  
	  //  calls out to the API with the API_Key
	  let response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
		  'Authorization': `Bearer ${API_Key}`
		}
	  });
  
	  // return a JSON Object
	  let data = await response.json();
  
	  // returning the JSON Object
	  return data;
  
	}
	catch (error) {
  
	  console.error(error);
	}
  }

async function displayMovies() {

	// calling this function to get the movies from the API
	let data = await getMovies();

	// HTML elements
	// movieList Div
	const movieListDiv = document.getElementById('movieList');
	
	// movieList Template
	const moviePosterTemplate = document.getElementById('movieCardTemplate');
	
	// Array of movies
	let movies = data.results;

	for (let i = 0; i < movies.length; i++) {
		// get each individual movie
		
		let movie = movies[i];
		
		// makes a copy of the template element !IMPORTANT! You must include "TRUE" in the cloneNode in order to 
		// access all of the child elements
		let movieCard = moviePosterTemplate.content.cloneNode(true);
		
		// look inside the template and find the first element with this class
		// adding the movie poster iamge to the element that is card-img-top
		let movieImageElement = movieCard.querySelector('.card-img-top')
		movieImageElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

		// accessing the h5 element (immediate child) in the card-body and adding the title
		let movieTitleElement = movieCard.querySelector('.card-body > h5');
		movieTitleElement.textContent = movie.title;

		// accessing the card-text to add the overview of the movie
		let movieDescriptionElement = movieCard.querySelector('.card-text');
		movieDescriptionElement.textContent = movie.overview;

		// modify the information for the button
		let movieButton = movieCard.querySelector('.btn-info');
		movieButton.setAttribute('data-movieId', movie.id);

		// adding the movie card to the HTML page
		movieListDiv.appendChild(movieCard);
	}

}

async function showMovieDetails(clickedBtn, data) {
	// get the ID of the movie that was clicked
	let movieId = clickedBtn.getAttribute('data-movieId');

	//TESTING: put the movie ID in the modal
	// modalBody.textContent = `Movie ID is : ${movieId}`;
	
	
	// get the details of the movie with the ID from TMDB
	let movieData = await getMovie(movieId);
	
	// put those details into the modal
	let modalTitle = document.querySelector('#movieModal .modal-title');
	modalTitle.textContent = movieData.title
	
	let movieModalPoster = document.querySelector('#movieModalPoster')
	movieModalPoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
	
	let movieModalOverview = document.querySelector('#movieModalOverview');
	movieModalOverview.innerHTML = `<strong>Movie Overview</strong>: ${movieData.overview}`;

	let movieModalTagline = document.querySelector('#movieModalTagline');
	movieModalTagline.innerHTML = `<strong>Tagline</strong>: "<em>${movieData.tagline}</em>"`;

	let movieModalPopularity = document.querySelector('#movieModalPopularity');
	movieModalPopularity.innerHTML = `<strong>Current Popularity</strong>: ${movieData.popularity}`;

	let movieModalReleaseDate = document.querySelector('#movieModalReleaseDate');
	movieModalReleaseDate.innerHTML = `<strong>Release Date</strong>: ${movieData.release_date}`;

	let movieModalRuntime = document.querySelector('#movieModalRuntime');
	movieModalRuntime.innerHTML = `<strong>Movie Runtime</strong>: ${movieData.runtime} minutes`;

	let movieModalGenres = document.querySelector('#movieModalGenres');
	let genres = [];
	for(let i = 0; i < movieData.genres.length; i++){
		genres += movieData.genres[i].name + ' ';
	}
	movieModalGenres.innerHTML = `<strong>Genre: </strong>${genres}`;


	let movieModalHomepage = document.getElementById('movieHomepageBtn');
	movieModalHomepage.href = movieData.homepage;

}