import { refs } from '../js/refs';
import libraryTpl from '../templates/library-card-movie.hbs';
//////////////////////////// WATCHED /////////////////////////////////

refs.modal.addEventListener('click', onWatchedClick);

const watchedArray = [];
const queueArray = [];
function onWatchedClick(e) {
  if (e.target.className !== 'add-to-watched-btn basic-button') {
    return;
  }

  
  const name = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;

  const getObject = {
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
  
  const name = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;

  const getObject = {
    name: name,
    img: imageURL,
    genre: genres,
    rating: rating,
  };
  queueArray.push(getObject);
  
  localStorage.setItem('Queue', JSON.stringify(queueArray));
}

refs.watched.addEventListener('click', onLibraryWathedClick);
refs.queue.addEventListener('click', onLibraryQueueClick);


function onLibraryWathedClick() {
  refs.library.innerHTML = '';
  const watchedMovies = localStorage.getItem('Watched');
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(watchedMovies));
}

function onLibraryQueueClick () {
  refs.library.innerHTML = '';
  const queueMovies = JSON.parse(localStorage.getItem('Queue'));
  refs.library.insertAdjacentHTML('beforeend', libraryTpl(queueMovies));
}