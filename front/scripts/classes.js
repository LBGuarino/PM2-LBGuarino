class Movies {
    constructor(title, year, director, duration, genre, rate, poster){
        this.title= title
        this.year= year
        this.director= director
        this.duration= duration
        this.genre= genre
        this.rate= rate
        this.poster= poster
    };
};

class Repository {
    constructor() {
        this.movies= [];
    };

    addMovie(movie) {
        this.movies.push(movie);
    };

    getAllMovies() {
        return this.movies
    }
};

module.exports = {Movies, Repository};