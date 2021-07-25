import './sass/main.scss';
import cardLibraryTpl from './templates/library-card-movie';

const ulEl = document.querySelector('.gallery-library');
ulEl.insertAdjacentHTML('beforeend', cardLibraryTpl());
