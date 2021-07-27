import './sass/main.scss';
import { fetchPopularDayMovies, fetchPopularWeekMovies, MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import { refs } from './js/refs';

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

