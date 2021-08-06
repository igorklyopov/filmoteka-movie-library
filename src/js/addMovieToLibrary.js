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
  const modalWindowContent = movieModalElement.innerHTML;

  const movieData = {
    date: date,
    name: name,
    img: imageURL,
    genre: genres,
    rating: rating,
    modalWindowContent: modalWindowContent,
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
  let watchedMovies = JSON.parse(localStorage.getItem('Watched'));
  if (activeFilter !== 'Queue') {
    refs.library.innerHTML = '';
    refs.library.insertAdjacentHTML('beforeend', libraryTpl(watchedMovies));
  }
};

function onAddToWatchedClick() {
  const movieData = getMovieDataFromOpenModal();
  const watchedList = getWatchedList();
  localStorage.setItem('Watched', JSON.stringify([...watchedList, movieData]));
  let watchedMovies = JSON.parse(localStorage.getItem('Watched'));
  if (activeFilter !== 'Queue') {
    refs.library.innerHTML = '';
    refs.library.insertAdjacentHTML('beforeend', libraryTpl(watchedMovies));
  }
}

//////////////////////////// QUEUE //////////////////////////////////

const onRemoveFromQueueClick = () => {
  const movieData = getMovieDataFromOpenModal();
  const queue = getQueue();
  localStorage.setItem(
    'Queue',
    JSON.stringify(queue.filter(({ name }) => name !== movieData.name)),
  );
  const queueMovies = JSON.parse(localStorage.getItem('Queue'));
  if (activeFilter !== 'Watched') {
    refs.library.innerHTML = '';
    refs.library.insertAdjacentHTML('beforeend', libraryTpl(queueMovies));
  }
};

function onAddToQueueClick() {
  const movieData = getMovieDataFromOpenModal();
  const queue = getQueue();
  localStorage.setItem('Queue', JSON.stringify([...queue, movieData]));
  const queueMovies = JSON.parse(localStorage.getItem('Queue'));
  if (activeFilter !== 'Watched') {
    refs.library.innerHTML = '';
    refs.library.insertAdjacentHTML('beforeend', libraryTpl(queueMovies));
  }
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

let activeFilter;
///////////////////////////////////////////////////////////////////////////
function onLibraryWatсhedClick(ev) {
  buttonSwitcher(refs.watched, refs.queue);
  refs.library.innerHTML = '';
  activeFilter = 'Watched';

  let watchedMovies = JSON.parse(localStorage.getItem('Watched'));
  if (watchedMovies !== null) {
    refs.emptyMassage.classList.add('visually-hidden');
  }
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(watchedMovies));
  refs.library.addEventListener('click', onCardClick);
  ////////////////
  function onCardClick(evt) {
    if (evt.target.className === 'closeCard') {
      return;
    }
    if (evt.path.length < 10) {
      return;
    }
    if (refs.modalInfo.innerHTML !== '') {
      return;
    }

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
    if (evt.path.length === 13) {
      pathNumber = 4;
    }

    const data = Object.assign({}, evt.path[pathNumber].dataset);

    refs.modalInfo.insertAdjacentHTML('beforeend', data.modalContent);
    refs.body.classList.add('body-scroll-none');

    refs.modal.classList.add('modal-movie-card-visible');

    ////////////////////

    initModalButtons();

    function btnRemoveWatched(e) {
      const nameClosebtn = e.target.offsetParent.children[0].children[1].children[0].innerText;
      const localFromClose = getWatchedList();
      let objects = localFromClose.filter(item => item.name !== nameClosebtn);
      localStorage.setItem('Watched', JSON.stringify(objects));
      objects = null;
      refs.library.innerHTML = libraryTpl(getWatchedList());
    }
    
  }
}
/////////////////////////////////////////////////////////////////////////////
function onLibraryQueueClick() {
  activeFilter = 'Queue';
  buttonSwitcher(refs.queue, refs.watched);
  refs.library.innerHTML = '';
  const queueMovies = JSON.parse(localStorage.getItem('Queue'));
  if (queueMovies === null) {
    refs.emptyMassage.classList.remove('visually-hidden');
  }
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(queueMovies));
  refs.library.addEventListener('click', onCardClickQ);

  //////////////
  function onCardClickQ(evt) {
    const nameClosebtnW = evt.target.parentNode.children[2].children[0].innerText;
    const hasMovieInWatched = getWatchedList().some(({ name }) => name === nameClosebtnW);

    if (hasMovieInWatched) {
      refs.modal.querySelector('.remove-from-watched-btn').classList.remove('visually-hidden');
      refs.modal.querySelector('.add-to-watched-btn').classList.add('visually-hidden');
    } else {
      refs.modal.querySelector('.add-to-watched-btn').classList.remove('visually-hidden');
      refs.modal.querySelector('.remove-from-watched-btn').classList.add('visually-hidden');
    }

    function btnRemoveQ(e) {
      const nameClosebtn = e.target.offsetParent.children[0].children[1].children[0].innerText;
      const localFromClose = getQueue();
      let objects = localFromClose.filter(item => item.name !== nameClosebtn);
      localStorage.setItem('Queue', JSON.stringify(objects));
      objects = null;
      refs.library.innerHTML = libraryTpl(getQueue());
    }

    if (evt.target.className === 'closeCard') {
      return;
    }
    if (evt.path.length < 10) {
      return;
    }
    if (refs.modalInfo.innerHTML !== '') {
      return;
    }

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
    if (evt.path.length === 13) {
      pathNumber = 4;
    }

    const data = Object.assign({}, evt.path[pathNumber].dataset);

    refs.modalInfo.insertAdjacentHTML('beforeend', data.modalContent);
    refs.body.classList.add('body-scroll-none');

    refs.modal.classList.add('modal-movie-card-visible');
  }
}
function onCloseQueueCard(e) {
  const nameClose = e.target.parentNode.children[2].children[0].innerText;

  const localFromClose = getQueue();

  let objects = localFromClose.filter(item => item.name !== nameClose);
  localStorage.setItem('Queue', JSON.stringify(objects));
  objects = null;
  refs.library.innerHTML = libraryTpl(getQueue());
}

function onCloseWatchedCard(e) {
  const nameClose = e.target.offsetParent?.children[2].children[0].innerText;
  const localFromClose = getWatchedList();
  let objects = localFromClose.filter(item => item.name !== nameClose);
  localStorage.setItem('Watched', JSON.stringify(objects));
  objects = null;
  refs.library.innerHTML = libraryTpl(getWatchedList());
}

refs.library.addEventListener('click', e => {
  if (e.target.classList.contains('closeCard')) {
    if (activeFilter === 'Watched') {
      onCloseWatchedCard(e);
    } else if (activeFilter === 'Queue') {
      onCloseQueueCard(e);
    }
  }
});

export { onLibraryWatсhedClick, initModalButtons };
