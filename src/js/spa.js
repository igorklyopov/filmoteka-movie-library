//Current URL locaton

import { refs } from './refs';
import { onSearch } from './onSearch';

const navigationLinks = document.getElementsByClassName('navigation-link'); //получение классов (массив)

[...navigationLinks].forEach(navigationLink => {
  //перебор массива
  navigationLink.addEventListener('click', function (e) {
    e.preventDefault(); //остановить обработку ссылки

    navigateTo(e.target.getAttribute('href')); //добавляет новое состояние в историю браузера
  });
});
// history.pushState(state, title[, url])

function realisePageSwiching(path) {
  if (path === '/library') {
    refs.searchMovieForm.classList.add('visually-hidden');
    refs.libraryButtons.classList.remove('visually-hidden');
  } else {
    refs.searchMovieForm.classList.remove('visually-hidden');
    refs.libraryButtons.classList.add('visually-hidden');
  }
}

const navigateTo = path => {
  history.pushState(null, null, path);
  realisePageSwiching(path);
};
window.addEventListener('popstate', () => {
  realisePageSwiching(window.location.pathname);
});

realisePageSwiching(window.location.pathname);
document.querySelector('.search-movie-form').addEventListener('submit', onSearch);
