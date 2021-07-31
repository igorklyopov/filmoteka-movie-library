import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
// import cardLibraryTpl from './templates/library-card-movie';
// import popularFilmsTpl from './templates/popular-films.hbs';
// import searchFilmsTpl from './templates/home-card-movie';
// import modalMovieInfo from './templates/modal-movie-content';
import { refs } from './js/refs';
import './js/onSearch';
// import './js/modalCloseAction'
import './js/toTopButton';
// import genres from './js/genres_ids.json'
import './js/loader';
import themeSwitcher from './js/theme-switcher';
import './js/spa';
import {
  onHomePageLoad,
  renderPopularMoviesCards,
  onWeekBtnClick,
  onDayBtnClick,
} from './js/popMoviesloadFunctions';

const moviesApiService = new MoviesApiService();

onHomePageLoad();

refs.weekBtn.addEventListener('click', onWeekBtnClick);
refs.dayBtn.addEventListener('click', onDayBtnClick);

//===тест работы подгрузки фильмов с увеличением номера страницы НАЧАЛО===//

const loadMoreBtnRef = document.querySelector('.js-load-more');
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  refs.dots.classList.remove('is-hidden');
  moviesApiService.incrementPage();
  try {
    await moviesApiService.getPopularDayMovies().then(movie => {
      return renderPopularMoviesCards(movie);
    });
  } catch (error) {
    console.log(error);
  }

  refs.dots.classList.add('is-hidden');
}
//===тест работы подгрузки фильмов с увеличением номера страницы КОНЕЦ====//
const ioCallback = ([entrie]) => {
  if (!entrie.isIntersecting) {
    return;
  }
  onLoadMoreBtnClick();
};

const observer = new IntersectionObserver(ioCallback, { threshold: 0 });

observer.observe(refs.anchor);
