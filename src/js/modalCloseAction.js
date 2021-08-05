const clsBtn = document.querySelector('.modal-button-close');
const modal = document.querySelector('.modal-movie-card');
const modalInfo = document.querySelector('.modal-movie-content')
const modalMovieOverlay = document.querySelector('.modal-overlay')
import onModalClick from './addMovieToLibrary'
import { refs } from '../js/refs';


const clickHandlerClose = function () {
    refs.modal.removeEventListener('click', onModalClick);
    refs.body.classList.remove('body-scroll-none');
    modal.classList.remove('modal-movie-card-visible');
    modalInfo.innerHTML = '';
};

const keyupHandlerClose = function (evt) {
    if (evt.code === 'Escape') {
        clickHandlerClose();
    }
}

clsBtn.addEventListener('click', clickHandlerClose);
modalMovieOverlay.addEventListener('click', clickHandlerClose);
window.addEventListener('keyup', keyupHandlerClose);