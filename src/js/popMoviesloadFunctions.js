import { MoviesApiService } from './apiService';
import { refs } from './refs';
import genres from './genres_ids.json';
import popularFilmsTpl from '../templates/popular-films.hbs';
import modalMovieInfo from '../templates/modal-movie-content';

import homeCardMovie from '../templates/home-card-movie';
import buttonSwitcher from './buttonSwitcher';
import switchLoadingDots from './switchLoadingDots';

const popMoviesApiService = new MoviesApiService();

function onHomePageLoad() {
  // if (refs.sectionContainer.classList.contains('visually-hidden')) {
  //   return
  // }

  try {
    popMoviesApiService.getPopularDayMovies().then(movie => {
      return renderPopularMoviesCards(movie);
    });
  } catch (error) {
    console.log(error);
  }
  refs.dayBtn.setAttribute('disabled', 'disabled');
  refs.dayBtn.classList.add('is-active');
}

const WATCHED = [];
const QUEUE = [];

function renderPopularMoviesCards(movies) {
  if (refs.sectionContainer.classList.contains('visually-hidden')) {
    return;
  }

  const moviesArray = [...movies.results];

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
    if (genresArray.length >= 3) {
      const other = ' Other';
      genresArray.splice(2, genresArray.length - 2);
      genresArray.push(other);
    }

    const releaseDate = element.release_date;

    const date = new Date(releaseDate);
    let year = date.getFullYear();
    if (!element.release_date) {
      return;
    }
    element.release_date = year;
  });

  const movieList = homeCardMovie(moviesArray);
  refs.moviesList.insertAdjacentHTML('beforeend', movieList);
  const cardClickHandler = function (evt) {
    const dateGet = evt.path[1].children[1].lastElementChild.children[0].innerText.slice(-4);

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
    data.date = dateGet;
    const markUp = modalMovieInfo(data);
    refs.modalInfo.insertAdjacentHTML('beforeend', markUp);

    refs.modal.classList.add('modal-movie-card-visible');

    const addToWatchedBtn = document.querySelector('.add-to-watched-btn');
    const addToQueueBtn = document.querySelector('.add-to-queue-btn');

    checkWatchedStatus(data);
    checkQueueStatus(data);

    addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
    addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);

    function checkWatchedStatus(data) {
      const watchedStorage = JSON.parse(localStorage.getItem('WATCHED'));
      if (watchedStorage.includes(data)) {
        addToWatchedBtn.textContent = 'REMOVE FROM WATCHED';
      }
    }

    function checkQueueStatus(data) {
      const queueStorage = JSON.parse(localStorage.getItem('WATCHED'));
      if (queueStorage.includes(data)) {
        addToQueueBtn.textContent = 'REMOVE FROM QUEUE';
      }
    }

    function onAddToWatchedBtnClick(event) {
      event.preventDefault();
      if (addToWatchedBtn.textContent === 'REMOVE FROM WATCHED') {
        let movieIndex = WATCHED.indexOf(data);
        WATCHED.splice(movieIndex, 1);
        localStorage.setItem('WATCHED', JSON.stringify(WATCHED));
        addToWatchedBtn.textContent = 'ADD TO WATCHED';
        return;
      }
      WATCHED.push(data);
      localStorage.setItem('WATCHED', JSON.stringify(WATCHED));
      addToWatchedBtn.textContent = 'REMOVE FROM WATCHED';
    }

    function onAddToQueueBtnClick(event) {
      event.preventDefault();
      checkQueueStatus(data);

      if (addToQueueBtn.textContent === 'REMOVE FROM QUEUE') {
        let movieIndex = QUEUE.indexOf(data);
        QUEUE.splice(movieIndex, 1);
        localStorage.setItem('QUEUE', JSON.stringify(QUEUE));
        addToQueueBtn.textContent = 'ADD TO QUEUE';
        return;
      }

      QUEUE.push(data);
      localStorage.setItem('QUEUE', JSON.stringify(QUEUE));
      addToQueueBtn.textContent = 'REMOVE FROM QUEUE';
    }
  };

  refs.moviesList.addEventListener('click', cardClickHandler);
}

function onWeekBtnClick() {
  try {
    refs.moviesList.innerHTML = '';

    buttonSwitcher(refs.weekBtn, refs.dayBtn);

    popMoviesApiService.resetPage();

    popMoviesApiService.getPopularWeekMovies().then(movie => {
      return renderPopularMoviesCards(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

function onDayBtnClick() {
  try {
    refs.moviesList.innerHTML = '';

    buttonSwitcher(refs.dayBtn, refs.weekBtn);

    popMoviesApiService.resetPage();

    popMoviesApiService.getPopularDayMovies().then(movie => {
      return renderPopularMoviesCards(movie);
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadMorePopMovies() {
  switchLoadingDots('on');

  popMoviesApiService.incrementPage();

  try {
    await popMoviesApiService.getPopularDayMovies().then(movie => {
      return renderPopularMoviesCards(movie);
    });
  } catch (error) {
    console.log(error);
  }

  switchLoadingDots('off');
}

export {
  onHomePageLoad,
  renderPopularMoviesCards,
  onWeekBtnClick,
  onDayBtnClick,
  loadMorePopMovies,
};
