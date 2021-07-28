import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import modalMovieInfo from './templates/modal-movie-content';
import { refs } from './js/refs';
import './js/onSearch'
import './js/modalCloseAction'
import './js/toTopButton'
import genres from './js/genres_ids.json'


//===loadTrandingMovies===//
import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './js/fetchConst';
import popularMoviesNavTpl from './templates/home-hopular-movies-nav.hbs';

onHomePageLoad()

function fetchPopularDayMovies() {
    return fetch(`${BASE_URL}/${TRANDING_DAY}?api_key=${API_KEY}`)
      .then(response => {
      return response.json();
    });
}


  function fetchPopularWeekMovies() {
    return fetch(`${BASE_URL}/${TRANDING_WEEK}?api_key=${API_KEY}`)
    .then(response => {
      return response.json();
    });
}

function renderPopularMoviesNav(navTpl) {
    refs.sectionContainer.insertAdjacentHTML('afterbegin', navTpl);
}



async function onHomePageLoad() {
  await renderPopularMoviesNav(popularMoviesNavTpl())
  const weekBtn = document.querySelector('.week');
  const dayBtn = document.querySelector('.day');
  weekBtn.addEventListener('click', onWeekBtnClick);
  dayBtn.addEventListener('click', onDayBtnClick);
  onDayBtnClick()
}

function renderPopularMoviesCards(movies) {
  const moviesArray = [...movies.results];
  moviesArray.forEach(element => {
    const genresArray = [...element.genre_ids]
    genresArray.forEach((id, index, array) => {
      genres.forEach(genre => {
        if (genre.id === id) {
          id = ' ' + genre.name;
        }
      })
      array[index] = id;
    })
    element.genre_ids = genresArray;
  });

  const movieList = popularFilmsTpl(moviesArray);
  refs.moviesList.insertAdjacentHTML('beforeend', movieList);
  const cardClickHandler = function (evt) {
    let pathNumber;

    if (evt.path.length === 10) {
      pathNumber = 1;
    }
    if (evt.path.length === 11) {
      pathNumber = 2;
    }
    if (evt.path.length === 12) {
      pathNumber = 3;
    }
    if (evt.path.length < 10) {
      return;
    }
    if (refs.modalInfo.innerHTML !== '') {
      return;
    }
        
    const data = Object.assign({}, evt.path[pathNumber].dataset);
    const markUp = modalMovieInfo(data);
    refs.modalInfo.insertAdjacentHTML('beforeend', markUp)

    refs.modal.classList.add('modal-movie-card-visible')
  }

    refs.moviesList.addEventListener('click', cardClickHandler);
}

function onWeekBtnClick() {
  refs.moviesList.innerHTML = '';

  const weekBtn = document.querySelector('.week');
  const dayBtn = document.querySelector('.day');
  dayBtn.removeAttribute('disabled');
  weekBtn.setAttribute('disabled', "disabled");

  try {
    if(localStorage.getItem('weekMovies') === null) {
      fetchPopularWeekMovies()
      .then((movie) => {
        renderPopularMoviesCards(movie);
        localStorage.setItem('weekMovies', JSON.stringify(movie))
      });
    }
      const popularWeekMovies = JSON.parse(localStorage.getItem('weekMovies'));
      renderPopularMoviesCards(popularWeekMovies);

  } catch (error) {
    console.log(error);
  }
}

function onDayBtnClick() {
  refs.moviesList.innerHTML = '';
  const weekBtn = document.querySelector('.week');
  const dayBtn = document.querySelector('.day');
  weekBtn.removeAttribute('disabled');
  dayBtn.setAttribute('disabled', "disabled");

  try {
    if(localStorage.getItem('dayMovies') === null) {
      fetchPopularDayMovies()
      .then((movie) => {
        renderPopularMoviesCards(movie);
        localStorage.setItem('dayMovies', JSON.stringify(movie));
      });
    } 
      const popularDayMovies = JSON.parse(localStorage.getItem('dayMovies'));
      renderPopularMoviesCards(popularDayMovies);

  } catch (error) {
    console.log(error);
  }
}
