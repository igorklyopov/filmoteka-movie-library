import { refs } from './refs';
import { fetchPopularDayMovies, fetchPopularWeekMovies, MoviesApiService } from './apiService';
import searchFilmsTpl from '../templates/home-card-movie';
import modalMovieInfo from '../templates/modal-movie-content';

refs.searchMovieForm.addEventListener('submit', onSearch);

const moviesApiService = new MoviesApiService();
let moviesList;
const modal = document.querySelector('.modal-movie-card')
const modalInfo = document.querySelector('.modal-movie-content')

function onSearch(e) {
  e.preventDefault();
  refs.sectionContainer.innerHTML = '';
  moviesApiService.query = e.currentTarget.elements.query.value;
  //   moviesApiService.resetPage();
  moviesApiService.fetchMoviesBySearch().then(renderResaultsMarkup);
}


function renderResaultsMarkup(results) {
    refs.sectionContainer.insertAdjacentHTML('beforeend', searchFilmsTpl(results));
    moviesList = document.querySelector('.movies-list');
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
        
    const data = Object.assign({}, evt.path[pathNumber].dataset);
    const markUp = modalMovieInfo(data);
    modalInfo.insertAdjacentHTML('beforeend', markUp)

    modal.classList.add('modal-movie-card-visible')
  }

    moviesList.addEventListener('click', cardClickHandler);
}

    



