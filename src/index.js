import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
// import cardLibraryTpl from './templates/library-card-movie';
// import popularFilmsTpl from './templates/popular-films.hbs';
// import searchFilmsTpl from './templates/home-card-movie';
// import modalMovieInfo from './templates/modal-movie-content';
import { refs } from './js/refs';
import './js/onSearch'
// import './js/modalCloseAction'
import './js/toTopButton'
// import genres from './js/genres_ids.json'
import './js/loader'
import themeSwitcher from './js/theme-switcher';
import './js/spa';
import { onHomePageLoad, renderPopularMoviesCards, onWeekBtnClick, onDayBtnClick } from './js/popMoviesloadFunctions';


const moviesApiService = new MoviesApiService();

onHomePageLoad()

refs.weekBtn.addEventListener('click', onWeekBtnClick);
refs.dayBtn.addEventListener('click', onDayBtnClick);



//===тест работы подгрузки фильмов с увеличением номера страницы НАЧАЛО===//

const loadMoreBtnRef = document.querySelector('.js-load-more')
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick)

function onLoadMoreBtnClick() {
  moviesApiService.incrementPage()
  
  moviesApiService.getPopularDayMovies().then((movie) => {
    return renderPopularMoviesCards(movie)
  });
  
}
//===тест работы подгрузки фильмов с увеличением номера страницы КОНЕЦ====//
