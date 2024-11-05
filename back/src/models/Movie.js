const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    duration: Number,
    genre: Array,
    rate: String,
    poster: String
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;