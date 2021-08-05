import popMoviesApiService from './apiService';
import { refs } from './refs';
import genres from './genres_ids.json';
import modalMovieInfo from '../templates/modal-movie-content';
import { initModalButtons } from './addMovieToLibrary'
import homeCardMovie from '../templates/home-card-movie';
import buttonSwitcher from './buttonSwitcher';
import switchLoadingDots from './switchLoadingDots';

function onHomePageLoad() {
  popMoviesApiService.resetPage()
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
  if (refs.sectionContainer.classList.contains('visually-hidden')) {
    return
  }

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
      if(genresArray.length >= 3) {
        const other = ' Other';
          genresArray.splice(2, (genresArray.length - 2));
          genresArray.push(other);
        }
        
      const releaseDate = element.release_date;

      const date = new Date(releaseDate);
      let year = date.getFullYear();
      
      if(!element.release_date) {
        return;
      }
      element.release_date = year;
    });
  
    const movieList = homeCardMovie(moviesArray);
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
      refs.body.classList.add('body-scroll-none');
      refs.modal.classList.add('modal-movie-card-visible')
      initModalButtons()
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
  // switchLoadingDots('on');

  popMoviesApiService.incrementPage()

  try {
    let movies

    if (popMoviesApiService.query) {
      movies = await popMoviesApiService.getmoviesBySearch();
    } else {
      movies = await popMoviesApiService.getPopularDayMovies();
    }
    return renderPopularMoviesCards(movies);
  } catch (error) {
    console.log(error);
  }

  // switchLoadingDots('off');
}

export { onHomePageLoad, renderPopularMoviesCards, onWeekBtnClick, onDayBtnClick, loadMorePopMovies};
