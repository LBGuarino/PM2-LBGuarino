
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

const repository = new Repository();

tempData.forEach(data => {
    const movie = new Movies(
        data.title,
        data.year,
        data.director,
        data.duration,
        data.genre,
        data.rate,
        data.poster);
    
    repository.addMovie(movie);
});

function renderMovies() {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = ""; // Limpiar el contenido anterior
  
    const movies = repository.getAllMovies();
    const moviesElements = movies.map((movie) => {
      const li = document.createElement("li");
      li.classList.add("card"); // Asegurarnos de que tenga la clase 'card'
      
      li.innerHTML = `
        <h3>${movie.title}</h3>
        <a href="#">
          <img src="${movie.poster}" alt="${movie.title} poster" />
        </a>
        <div>
          <p>Director: ${movie.director}</p>
          <p>Duration: ${movie.duration}</p>
          <p>Genre: ${movie.genre.join(", ")}</p>
          <p>Rating: ${movie.rate}</p>
        </div>
      `;
      
      return li;
    });
  
    moviesElements.forEach((element) => cardsContainer.appendChild(element));
  }
  
  renderMovies();
  





