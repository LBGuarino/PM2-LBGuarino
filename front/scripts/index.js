const {Movies, Repository} = require("./classes");
const renderMovies = require("./renderCards");

const repository = new Repository();

  $.get("https://students-api.up.railway.app/movies", (data) => {
    data.forEach((movieData) => {
      const movie = new Movies(
        movieData.title,
        movieData.year,
        movieData.director,
        movieData.duration,
        movieData.genre,
        movieData.rate,
        movieData.poster
      );
      repository.addMovie(movie);
    });
    renderMovies(repository);
  });
  



