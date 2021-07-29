import './sass/main.scss';
import { MoviesApiService } from './js/apiService';
import cardLibraryTpl from './templates/library-card-movie';
import popularFilmsTpl from './templates/popular-films.hbs';
import searchFilmsTpl from './templates/home-card-movie';
import modalMovieInfo from './templates/modal-movie-content';
import { refs } from './js/refs';
import './js/onSearch'
// import './js/modalCloseAction'
import './js/toTopButton'
import genres from './js/genres_ids.json'
import './js/loader'
import themeSwitcher from './js/theme-switcher';
import './js/spa';

//===loadTrandingMovies===//

const moviesApiService = new MoviesApiService();

onHomePageLoad()

function onHomePageLoad() {
  moviesApiService.getPopularDayMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
      });

  refs.dayBtn.setAttribute('disabled', "disabled");
  refs.dayBtn.classList.add('is-active');
}

refs.weekBtn.addEventListener('click', onWeekBtnClick);
refs.dayBtn.addEventListener('click', onDayBtnClick);

function renderPopularMoviesCards(movies) {
  const moviesArray = [...movies.results];
  moviesArray.forEach(element => {
    const genresArray = [...element.genre_ids]
    genresArray.forEach((id, index, array) => {
      genres.forEach(genre => {
        if (genre.id === id) {
          id = ' ' + genre.name;
        }
      })
      array[index] = id;
    })
    element.genre_ids = genresArray;
  });

  const movieList = popularFilmsTpl(moviesArray);
  refs.moviesList.insertAdjacentHTML('beforeend', movieList);
  const cardClickHandler = function (evt) {
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
    if (evt.path.length < 10) {
      return;
    }
    if (refs.modalInfo.innerHTML !== '') {
      return;
    }
        
    const data = Object.assign({}, evt.path[pathNumber].dataset);
    const markUp = modalMovieInfo(data);
    refs.modalInfo.insertAdjacentHTML('beforeend', markUp)

    refs.modal.classList.add('modal-movie-card-visible')
  }

    refs.moviesList.addEventListener('click', cardClickHandler);
}

function onWeekBtnClick() {
  refs.moviesList.innerHTML = '';
  refs.dayBtn.removeAttribute('disabled');
  refs.weekBtn.setAttribute('disabled', "disabled");
  refs.weekBtn.classList.add('is-active');
  refs.dayBtn.classList.remove('is-active');

  moviesApiService.resetPage()

  moviesApiService.getPopularWeekMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
      });

}

function onDayBtnClick() {
  refs.moviesList.innerHTML = '';

  refs.weekBtn.removeAttribute('disabled');
  refs.dayBtn.setAttribute('disabled', "disabled");
  refs.dayBtn.classList.add('is-active');
  refs.weekBtn.classList.remove('is-active');

  moviesApiService.resetPage()

  moviesApiService.getPopularDayMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
      });
}

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
