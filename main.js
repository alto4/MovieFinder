// DOM Variable Declarations
var searchButton = document.querySelector('#btn-search');
var container = document.querySelector('.movie-cards-container');

// searchMovie Function - creates a query string based on user input in search bar
var searchMovie = function (input) {
  if (input) {
    httpRequest.open('GET', 'https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=9d952d2e');
    httpRequest.send();
    console.log('attempt made to retrieve data');
    console.log('https://www.omdbapi.com/?s=' + input + '&plot=short&apikey=9d952d2e');
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

httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    // Once the request has been fulfilled without error, populate movie data on corresponding fields
    if (httpRequest.status === 200) {
      var movies = JSON.parse(httpRequest.responseText);
      movies.Search.forEach(function (movie) {
        var movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML += '<img src="' + movie.Poster + '" class="poster"><br/> <a href="https://www.imdb.com/title/' + movie.imdbID + '/?ref_=nv_sr_srsg_0" target="_blank"><p>' + movie.Title + '</a><br/>Year: ' + movie.Year + '<br />Type:  ' + movie.Type + '</p>'
        container.append(movieCard);
      });
    } else {
      console.log(httpRequest.statusText);
    }
  }
}


httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
}