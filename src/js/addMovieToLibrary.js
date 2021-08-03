import { refs } from '../js/refs';
import libraryTpl from '../templates/library-card-movie.hbs';
import buttonSwitcher from './buttonSwitcher';
//////////////////////////// WATCHED /////////////////////////////////

refs.modal.addEventListener('click', onWatchedClick);

let watchedArray = [];
let queueArray = [];

if (localStorage.getItem('Watched') !== null) {
  let locWatched = JSON.parse(localStorage.getItem('Watched'));
  watchedArray.push(...locWatched);
}

if (localStorage.getItem('Queue') !== null) {
  let locQueue = JSON.parse(localStorage.getItem('Queue'));
  queueArray.push(...locQueue);
}

function onWatchedClick(e) {
  if (e.target.className !== 'add-to-watched-btn basic-button') {
    return;
  }

  e.target.setAttribute('disabled', 'disabled');

  const name = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;
  const date =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[4].innerText;

  const getObject = {
    date: date,
    name: name,
    img: imageURL,
    genre: genres,
    rating: rating,
  };

  watchedArray.push(getObject);
  localStorage.setItem('Watched', JSON.stringify(watchedArray));
}

//////////////////////////// QUEUE //////////////////////////////////

refs.modal.addEventListener('click', onQueueClick);

function onQueueClick(e) {
  if (e.target.className !== 'add-to-queue-btn basic-button') {
    return;
  }
  e.target.setAttribute('disabled', 'disabled');

  const name = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;
  const date =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[4].innerText;

  const getObject = {
    date: date,
    name: name,
    img: imageURL,
    genre: genres,
    rating: rating,
  };
  queueArray.push(getObject);

  localStorage.setItem('Queue', JSON.stringify(queueArray));
}

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
    
    let objects = localFromClose.filter((item) => item.name !== nameClose);
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

export { onWatchedClick, onLibraryWatсhedClick };
