import './sass/main.scss';
import { fetchPopularDayMovies, fetchPopularWeekMovies } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', onHomePageLoad);
refs.weekBtn.addEventListener('click', onWeekBtnClick);

function onHomePageLoad() {
    refs.sectionContainer.innerHTML = '';
    fetchPopularDayMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
}

function onWeekBtnClick() {
    refs.sectionContainer.innerHTML = '';
    fetchPopularWeekMovies()
    .then(movie => renderPopularMoviesCards(movie))
    .catch(console.log);
}

function renderPopularMoviesCards(movies) {
    const movieList = popularFilmsTpl(movies);
    refs.sectionContainer.insertAdjacentHTML('afterbegin', movieList);
}


