const clsBtn = document.querySelector('.modal-button-close');
const modal = document.querySelector('.modal-movie-card');
const modalInfo = document.querySelector('.modal-movie-content')
const modalMovieOverlay = document.querySelector('.modal-overlay')

const clickHandlerClose = function () {
    modal.classList.remove('modal-movie-card-visible');
    modalInfo.innerHTML = '';
}

clsBtn.addEventListener('click', clickHandlerClose);
modalMovieOverlay.addEventListener('click', clickHandlerClose);