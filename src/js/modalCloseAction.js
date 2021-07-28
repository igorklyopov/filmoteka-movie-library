const clsBtn = document.querySelector('.modal-button-close');
const modal = document.querySelector('.modal-movie-card');
const modalInfo = document.querySelector('.modal-movie-content')


const clickHandlerClose = function () {
    modal.classList.remove('modal-movie-card-visible');
    modalInfo.innerHTML = '';
}

clsBtn.addEventListener('click', clickHandlerClose);