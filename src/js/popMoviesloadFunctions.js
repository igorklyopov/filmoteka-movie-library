import { MoviesApiService } from './apiService';
import { refs } from './refs';
import genres from './genres_ids.json';
import popularFilmsTpl from '../templates/popular-films.hbs';
import buttonSwitcher from './buttonSwitcher';
import switchLoadingDots from './switchLoadingDots';

const popMoviesApiService = new MoviesApiService();

function onHomePageLoad() {
  try {
      popMoviesApiService.getPopularDayMovies().then((movie) => {
      return renderPopularMoviesCards(movie);
    });
    
  } catch (error) {
    console.log(error);
  }
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
  try {
    refs.moviesList.innerHTML = '';
  
    buttonSwitcher(refs.weekBtn, refs.dayBtn);
  
    popMoviesApiService.resetPage()
  
    popMoviesApiService.getPopularWeekMovies().then((movie) => {
      return renderPopularMoviesCards(movie)
    });
  } catch (error) {
    console.log(error);
  }

}
  
function onDayBtnClick() {
  try {
    refs.moviesList.innerHTML = '';
  
    buttonSwitcher(refs.dayBtn, refs.weekBtn);
  
    popMoviesApiService.resetPage()
  
    popMoviesApiService.getPopularDayMovies().then((movie) => {
      return renderPopularMoviesCards(movie)
    });
  } catch (error) {
    console.log(error);
  }

}

async function loadMorePopMovies() {
  switchLoadingDots('on');

  popMoviesApiService.incrementPage()

  try {
    await popMoviesApiService.getPopularDayMovies().then((movie) => {
  
      return renderPopularMoviesCards(movie)
    });
  } catch (error) {
    console.log(error);
  }

  switchLoadingDots('off');
}

export { onHomePageLoad, renderPopularMoviesCards, onWeekBtnClick, onDayBtnClick, loadMorePopMovies};
