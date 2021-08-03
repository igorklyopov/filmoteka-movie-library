import { refs } from '../js/refs';
import libraryTpl from '../templates/library-card-movie.hbs';
import buttonSwitcher from './buttonSwitcher';

const getQueue = () => JSON.parse(localStorage.getItem('Queue')) || [];
const getWatchedList = () => JSON.parse(localStorage.getItem('Watched')) || [];

const getMovieDataFromOpenModal = () => {
  const movieModalElement = refs.modal.querySelector('.movie-modal');
  const name = movieModalElement.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = movieModalElement.childNodes[0].childNodes[1].currentSrc;
  const genres =
    movieModalElement.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    movieModalElement.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;
  const date =
    movieModalElement.childNodes[0].children[1].children[1].children[1].children[4].innerText;

  const movieData = {
    date: date,
    name: name,
    img: imageURL,
    genre: genres,
    rating: rating,
  };

  return movieData;
};

const initModalButtons = () => {
  const movieData = getMovieDataFromOpenModal();
  const queue = getQueue();
  const watchedList = JSON.parse(localStorage.getItem('Watched')) || [];
  const hasMovieInQueue = queue.some(({ name }) => name === movieData.name);
  const hasMovieInWatched = watchedList.some(({ name }) => name === movieData.name);

  if (hasMovieInWatched) {
    refs.modal.querySelector('.remove-from-watched-btn').classList.remove('visually-hidden');
    refs.modal.querySelector('.add-to-watched-btn').classList.add('visually-hidden');
  } else {
    refs.modal.querySelector('.add-to-watched-btn').classList.remove('visually-hidden');
    refs.modal.querySelector('.remove-from-watched-btn').classList.add('visually-hidden');
  }

  if (hasMovieInQueue) {
    refs.modal.querySelector('.remove-from-queue-btn').classList.remove('visually-hidden');
    refs.modal.querySelector('.add-to-queue-btn').classList.add('visually-hidden');
  } else {
    refs.modal.querySelector('.remove-from-queue-btn').classList.add('visually-hidden');
    refs.modal.querySelector('.add-to-queue-btn').classList.remove('visually-hidden');
  }
};

//////////////////////////// WATCHED /////////////////////////////////

const onRemoveFromWatchedClick = () => {
  const movieData = getMovieDataFromOpenModal();
  const watchedList = getWatchedList();
  localStorage.setItem(
    'Watched',
    JSON.stringify(watchedList.filter(({ name }) => name !== movieData.name)),
  );
};

function onAddToWatchedClick() {
  const movieData = getMovieDataFromOpenModal();
  const watchedList = getWatchedList();
  localStorage.setItem('Watched', JSON.stringify([...watchedList, movieData]));
}

//////////////////////////// QUEUE //////////////////////////////////

const onRemoveFromQueueClick = () => {
  const movieData = getMovieDataFromOpenModal();
  const queue = getQueue();
  localStorage.setItem(
    'Queue',
    JSON.stringify(queue.filter(({ name }) => name !== movieData.name)),
  );
};

function onAddToQueueClick() {
  const movieData = getMovieDataFromOpenModal();

  const queue = getQueue();
  localStorage.setItem('Queue', JSON.stringify([...queue, movieData]));
}

const onModalClick = e => {
  if (e.target.classList.contains('add-to-queue-btn')) {
    onAddToQueueClick(e);
    initModalButtons();
  } else if (e.target.classList.contains('remove-from-queue-btn')) {
    onRemoveFromQueueClick(e);
    initModalButtons();
  } else if (e.target.classList.contains('add-to-watched-btn')) {
    onAddToWatchedClick(e);
    initModalButtons();
  } else if (e.target.classList.contains('remove-from-watched-btn')) {
    onRemoveFromWatchedClick(e);
    initModalButtons();
  }
};

refs.modal.addEventListener('click', onModalClick);

refs.watched.addEventListener('click', onLibraryWatсhedClick);
refs.queue.addEventListener('click', onLibraryQueueClick);

function onLibraryWatсhedClick() {
  buttonSwitcher(refs.watched, refs.queue);
  refs.library.innerHTML = '';

  let watchedMovies = JSON.parse(localStorage.getItem('Watched'));
  if (watchedMovies !== null) {
    refs.emptyMassage.classList.add('visually-hidden');
  }
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(watchedMovies));

  ///////////////////////// CLOSE ///////////////////////

  refs.library.addEventListener('click', onCloseCard);
  function onCloseCard(e) {
    if (e.target.className !== 'closeCard') {
      return;
    }

    const nameClose = e.target.offsetParent?.children[2].children[0].innerText;
    const localFromClose = JSON.parse(localStorage.getItem('Watched'));

    let objects = localFromClose.filter(item => item.name !== nameClose);
    localStorage.setItem('Watched', JSON.stringify(objects));
    let updateWatchedMovies = JSON.parse(localStorage.getItem('Watched'));
    refs.library.innerHTML = libraryTpl(updateWatchedMovies);
    watchedArray = objects;
  }
}
///////////////////////// CLOSE //////////////////////////
function onLibraryQueueClick() {
  buttonSwitcher(refs.queue, refs.watched);
  refs.library.innerHTML = '';
  const queueMovies = JSON.parse(localStorage.getItem('Queue'));
  if (queueMovies === null) {
    refs.emptyMassage.classList.remove('visually-hidden');
  }
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(queueMovies));
}

export { onLibraryWatсhedClick, initModalButtons };
