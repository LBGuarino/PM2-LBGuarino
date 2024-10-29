const {Movies, Repository} = require("./classes");
const renderMovies = require("./renderCards");
const axios = require("axios");

const repository = new Repository();

const fetchData = async () => {
  try {
    console.log("Estamos intentando hacer una solicitud");
    const data = await axios.get("https://students-api.up.railway.app/movies");
    (data.data).forEach((movieData) => {
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
  } catch (err) {
    console.log("Tuvimos un error. Estamos en el bloque catch");
    console.log(err.message);
  };
};
fetchData();
