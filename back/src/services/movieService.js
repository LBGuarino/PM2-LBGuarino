const Movie = require("../models/Movie")

module.exports = {
    getMovies: async () => {
        const movies = await Movie.find();
        return movies;
    },

    createMovie: async (movieData) => {
        const newMovie = await Movie.create(movieData);
        console.log(newMovie);
        return newMovie;
    },
};

