const movieService = require("../services/movieService");

module.exports = {
    getAllMovies: async (req, res) => {
        try {
            const movies = await movieService.getMovies();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({
                error: "internal server error",
            });
        }
    },

    createMovies: async (req, res) => {
        try {
            const newMovie = await movieService.createMovie(req.body);
            res.status(200).json(newMovie);
        } catch (error) {
            res.status(500).json({
                error: "internal server error",
            });
        }
        
    },
};