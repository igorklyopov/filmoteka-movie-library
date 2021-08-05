import { refs } from './refs';
import moviesApiService from './apiService';
import { showErrorMessage } from './incorrectInput';
import searchFilmsTpl from '../templates/home-card-movie';
import modalMovieInfo from '../templates/modal-movie-content';
import genres from './genres_ids.json';
import { initModalButtons } from './addMovieToLibrary';
import historyTpl from '/templates/element-press';

let moviesList;

export function onSearch(e) {
  e.preventDefault();
  refs.sectionContainer.innerHTML = '';
  refs.popularMoveisNav.classList.add('visually-hidden');
  moviesApiService.query = e.currentTarget.elements.query.value.trim();

  if (moviesApiService.query === '') {
    showErrorMessage('Enter your search query, please!');
    return;
  }
  moviesApiService.resetPage();
  moviesApiService.getmoviesBySearch().then(renderResaultsMarkup);

  ///////////////// History ///////////////////

  let LocalHistory = [];
  if (!localStorage.getItem('history')) {
    localStorage.setItem('history', JSON.stringify(LocalHistory));
  }
  const historyGet = JSON.parse(localStorage.getItem('history'));
  LocalHistory.push(...historyGet);
  const obj = {
    title: moviesApiService.query,
  };
  LocalHistory.unshift(obj);
  localStorage.setItem('history', JSON.stringify(LocalHistory));
  const historyEnd = JSON.parse(localStorage.getItem('history'));
  refs.historyUl.innerHTML = '';
  return LocalHistory;
}

refs.statisticsBnt.addEventListener('click', onStatClick);

function onStatClick(LocalHistory) {
  let history = JSON.parse(localStorage.getItem('history'));
  refs.historyUl.insertAdjacentHTML('afterbegin', historyTpl(history));
}
window.addEventListener('click', onStatClickremove);

function onStatClickremove(e) {
  if (!e.path[1].children[0].children[0].children[1].children[0]);
  refs.historyUl.innerHTML = '';
}
///////////////// History ///////////////////

function renderResaultsMarkup(data) {
  const { results } = data;
  if (results.length === 0) {
    showErrorMessage('Search result not successful. Enter the correct movie name and try again!');
    setTimeout(function () {
      window.location.href = './index.html';
    }, 5000);
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

export async function loadMoreSearchMovies() {
  switchLoadingDots('on');

  moviesApiService.incrementPage();

  try {
    await moviesApiService.getmoviesBySearch().then(movie => {
      return renderResaultsMarkup(movie);
    });
  } catch (error) {
    console.log(error);
  }

  switchLoadingDots('off');
}
