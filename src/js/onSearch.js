import { refs } from './refs';
import { MoviesApiService } from './apiService';
import { showErrorMessage } from './incorrectInput';
import searchFilmsTpl from '../templates/home-card-movie';
import modalMovieInfo from '../templates/modal-movie-content';
import genres from './genres_ids.json';
import { initModalButtons } from './addMovieToLibrary';

const moviesApiService = new MoviesApiService();
let moviesList;

export function onSearch(e) {
  e.preventDefault();
  refs.sectionContainer.innerHTML = '';
  refs.popularMoveisNav.classList.add('visually-hidden');
  moviesApiService.query = e.currentTarget.elements.query.value.trim();

  if (moviesApiService.query === '') {
    showErrorMessage('Enter your search query, please!');
    return
  }
  moviesApiService.getmoviesBySearch().then(renderResaultsMarkup);
}

function renderResaultsMarkup(results) {
  
  if(results.length === 0) {
    showErrorMessage('Search result not successful. Enter the correct movie name and try again!');
  }
  const moviesArray = [...results];
  moviesArray.forEach(element => {
    const genresArray = [...element.genre_ids];
    genresArray.forEach((id, index, array) => {
      genres.forEach(genre => {
        if (genre.id === id) {
          id = ' ' + genre.name;
        }
      });
      array[index] = id;
    });
    element.genre_ids = genresArray;
  });

  refs.sectionContainer.insertAdjacentHTML('afterbegin', searchFilmsTpl(moviesArray));
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
    if (refs.modalInfo.innerHTML !== '') {
      return;
    }

    const data = Object.assign({}, evt.path[pathNumber].dataset);
    const markUp = modalMovieInfo(data);

    refs.modalInfo.insertAdjacentHTML('beforeend', markUp);

    refs.modal.classList.add('modal-movie-card-visible');
    initModalButtons();
  };

  moviesList.addEventListener('click', cardClickHandler);
}
