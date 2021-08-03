import { refs } from './refs';
import { onSearch } from './onSearch';
import { onHomePageLoad } from './popMoviesloadFunctions';
import { onWatchedClick, onLibraryWatсhedClick } from './addMovieToLibrary';
import libraryTpl from '../templates/library-card-movie.hbs';
import buttonSwitcher from './buttonSwitcher';

// const navigationLinks = document.getElementsByClassName('navigation-link'); //получение классов (массив)

// [...navigationLinks].forEach(navigationLink => {
//   //перебор массива
//   navigationLink.addEventListener('click', function (e) {
//     e.preventDefault(); //остановить обработку ссылки

//     navigateTo(e.target.getAttribute('href')); //добавляет новое состояние в историю браузера
//   });
// });
// // history.pushState(state, title[, url])

// function realisePageSwiching(path) {
//   if (path === '/library') {
//     refs.searchMovieForm.classList.add('visually-hidden');
//     refs.libraryButtons.classList.remove('visually-hidden');
//     refs.myLibraryIsActive.classList.add('active-navigation');
//     refs.myHomeIsActive.classList.remove('active-navigation');
//   } else {
//     refs.searchMovieForm.classList.remove('visually-hidden');
//     refs.libraryButtons.classList.add('visually-hidden');
//     refs.myLibraryIsActive.classList.remove('active-navigation');
//     refs.myHomeIsActive.classList.add('active-navigation');
//   }
// }

// const navigateTo = path => {
//   history.pushState(null, null, path);
//   realisePageSwiching(path);
// };
// window.addEventListener('popstate', () => {
//   realisePageSwiching(window.location.pathname);
// });

// realisePageSwiching(window.location.pathname);
// document.querySelector('.search-movie-form').addEventListener('submit', onSearch);
/////////////////////////////////////////////////////////////////////////////////

refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.mylibraryBtn.addEventListener('click', onMyLibraryBtnClick);

function onHomeBtnClick(e) {
  onHomePageLoad();
  refs.library.classList.add('visually-hidden');//
  refs.popularMoveisNav.classList.remove('visually-hidden');
  refs.sectionContainer.classList.remove('visually-hidden');
  refs.searchMovieForm.classList.remove('visually-hidden');
  refs.libraryButtons.classList.add('visually-hidden');
  refs.mylibraryBtn.classList.remove('active-navigation');
  refs.homeBtn.classList.add('active-navigation');
}

function onMyLibraryBtnClick(e) {
  // e.preventDefault();
  refs.library.classList.remove('visually-hidden');//
  refs.sectionContainer.innerHTML = '';
  refs.popularMoveisNav.classList.add('visually-hidden');
  refs.sectionContainer.classList.add('visually-hidden');
  refs.searchMovieForm.classList.add('visually-hidden');
  refs.libraryButtons.classList.remove('visually-hidden');
  refs.mylibraryBtn.classList.add('active-navigation');
  refs.homeBtn.classList.remove('active-navigation');
  onLibraryWatсhedClick();
}
document.querySelector('.search-movie-form').addEventListener('submit', onSearch);
