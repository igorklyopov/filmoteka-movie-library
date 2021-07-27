import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import { refs } from './js/refs';
import './js/onSearch'
import './js/modalCloseAction'


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
    // refs.sectionContainer.innerHTML = '';
  await renderPopularMoviesNav(popularMoviesNavTpl())
  const weekBtn = document.querySelector('.week')
  const dayBtn = document.querySelector('.day')
  weekBtn.addEventListener('click', onWeekBtnClick);
  dayBtn.addEventListener('click', onDayBtnClick);
  onDayBtnClick()
}

function renderPopularMoviesCards(movies) {
    const movieList = popularFilmsTpl(movies);
    // refs.sectionContainer.innerHTML= movieList;
  refs.moviesList.insertAdjacentHTML('beforeend', movieList);
}

function onWeekBtnClick() {
    refs.moviesList.innerHTML = '';
    fetchPopularWeekMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
}

function onDayBtnClick() {
    refs.moviesList.innerHTML = '';
    fetchPopularDayMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
    }
