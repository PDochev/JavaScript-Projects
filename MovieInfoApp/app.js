const movieNameRef = document.querySelector("#movie-name");
const searchBtn = document.querySelector("#search-btn");
let result = document.querySelector("#result");

let getMovie = async () => {
  try {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=7f9a3b82`;

    if (movieName.length < 0) {
      result.innerHTML = `<h3 class="msg"> Please enter a movie name </h3> `;
    } else {
      const res = await axios.get(url);

      result.innerHTML = `
    <div class="info">
    <img src=${res.data.Poster} class ="poster">
    </div>
    <h2>${res.data.Title}</h2>
    <div class="rating">
    <img src="star-icon.svg">
    <h4>${res.data.imdbRating}</h4>
    </div>
    <div class="details">
    <span>${res.data.Rated}</span>
    <span>${res.data.Year}</span>
    <span>${res.data.Runtime}</span>
    </div>
    <div class="genre">
    <div>${res.data.Genre.split(",").join("</div><div>")}</div>
    </div>
</div>
<h3>Plot:</h3>
<p>${res.data.Plot}</p>
<h3>Cast:</h3>
<p>${res.data.Actors}</p>
`;

      //   return res.data;
    }
  } catch (e) {
    result.innerHTML = `<h3 class="msg">Error Occured.</h3>`;
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
