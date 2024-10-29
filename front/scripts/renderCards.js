const renderMovies = (repository) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = ""; 

  const movies = repository.getAllMovies();

  const moviesElements = movies.map((movie) => {
    const li = document.createElement("li");
    li.classList.add("card"); 
    
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
};

module.exports = renderMovies;

