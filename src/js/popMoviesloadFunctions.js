import { MoviesApiService } from './apiService';
import { refs } from './refs';
import genres from './genres_ids.json';
import popularFilmsTpl from '../templates/popular-films.hbs';

const moviesApiService = new MoviesApiService();

function onHomePageLoad() {
    moviesApiService.getPopularDayMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
    });
  
    refs.dayBtn.setAttribute('disabled', "disabled");
    refs.dayBtn.classList.add('is-active');
}

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
  
    buttonSwitcher(refs.weekBtn, refs.dayBtn);
  
    moviesApiService.resetPage()
  
    moviesApiService.getPopularWeekMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
    });
  
}
  
function onDayBtnClick() {
    refs.moviesList.innerHTML = '';
  
    buttonSwitcher(refs.dayBtn, refs.weekBtn);
  
    moviesApiService.resetPage()
  
    moviesApiService.getPopularDayMovies().then((movie) => {
        return renderPopularMoviesCards(movie)
    });
}

function buttonSwitcher(ActiveBtn, InActiveBtn) {
    ActiveBtn.setAttribute('disabled', "disabled");
    InActiveBtn.removeAttribute('disabled');
  
    ActiveBtn.classList.add('is-active');
    InActiveBtn.classList.remove('is-active');
}

export { onHomePageLoad, renderPopularMoviesCards, onWeekBtnClick, onDayBtnClick, buttonSwitcher };
