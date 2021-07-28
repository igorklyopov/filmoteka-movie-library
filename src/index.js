import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info } from '@pnotify/core';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import { refs } from './js/refs';
import themeSwitcher from './js/theme-switcher';

refs.searchMovieForm.addEventListener('submit', onSearch);

const moviesApiService = new MoviesApiService();

function onSearch(e) {
  e.preventDefault();
  refs.sectionContainer.innerHTML = '';
  moviesApiService.query = e.currentTarget.elements.query.value;
  //   moviesApiService.resetPage();

  moviesApiService.fetchMoviesBySearch().then(renderResaultsMarkup);
}

function renderResaultsMarkup(results) {
  refs.sectionContainer.insertAdjacentHTML('beforeend', searchFilmsTpl(results));
}

//===loadTrandingMovies===//
import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './js/fetchConst';
import popularMoviesNavTpl from './templates/home-hopular-movies-nav.hbs';

onHomePageLoad();

function fetchPopularDayMovies() {
  return fetch(`${BASE_URL}/${TRANDING_DAY}?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

function fetchPopularWeekMovies() {
  return fetch(`${BASE_URL}/${TRANDING_WEEK}?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

function renderPopularMoviesNav(navTpl) {
  refs.sectionContainer.insertAdjacentHTML('afterbegin', navTpl);
}

async function onHomePageLoad() {
  // refs.sectionContainer.innerHTML = '';
  await renderPopularMoviesNav(popularMoviesNavTpl());
  const weekBtn = document.querySelector('.week');
  const dayBtn = document.querySelector('.day');
  weekBtn.addEventListener('click', onWeekBtnClick);
  dayBtn.addEventListener('click', onDayBtnClick);
  onDayBtnClick();
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
