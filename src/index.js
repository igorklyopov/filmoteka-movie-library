import './sass/main.scss';
import { fetchPopularDayMovies, fetchPopularWeekMovies, MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', onHomePageLoad);
refs.weekBtn.addEventListener('click', onWeekBtnClick);
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

function onHomePageLoad() {
  refs.sectionContainer.innerHTML = '';
  fetchPopularDayMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
}

function onWeekBtnClick() {
  refs.sectionContainer.innerHTML = '';
  fetchPopularWeekMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
}

function renderPopularMoviesCards(movies) {
  const movieList = popularFilmsTpl(movies);
  refs.sectionContainer.insertAdjacentHTML('afterbegin', movieList);
}
