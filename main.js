// DOM Variable Declarations
var searchButton = document.querySelector('#btn-search');
var container = document.querySelector('.movie-cards-container');

// searchMovie Function - creates a query string based on user input in search bar
var searchMovie = function (input) {
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=9d952d2e');
    httpRequest.send();
  }
}

// Event listener for search button - when clicked, generate a new request string and populate results in the DOM to show movie result details
searchButton.addEventListener('click', function () {
  var input = document.querySelector('input').value;
  container.innerHTML = '';
  searchMovie(input);
})


// Generate new http request 
var httpRequest = new XMLHttpRequest();

// Handle results of the request by displaying results if received, or otherwise by displaying an error message in the console
httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    // Once the request has been fulfilled without error, populate movie data on corresponding fields
    if (httpRequest.status === 200) {
      var movies = JSON.parse(httpRequest.responseText);

      // Loop through all search results and create movie card divs displaying basic info about each result
      movies.Search.forEach(function (movie) {
        var movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML += '<img src="' + movie.Poster + '" class="poster"><br/> <a href="https://www.imdb.com/title/' +
          movie.imdbID + '/?ref_=nv_sr_srsg_0" target="_blank"><p>' + movie.Title + '</a><br/>Year: ' + movie.Year + '<br />Type:  ' +
          movie.Type + '</p>'
        container.append(movieCard);
      });
      // If the http request runs into an error, log the error details in the console
    } else {
      console.log(httpRequest.statusText);
    }
  }
}

httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
}