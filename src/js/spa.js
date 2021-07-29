//Current URL locaton

import { refs } from './refs';

const navigationLinks = document.getElementsByClassName('navigation-link'); //получение классов (массив)

[...navigationLinks].forEach(navigationLink => {
  //перебор массива
  navigationLink.addEventListener('click', function (e) {
    //навешивание слушателя
    e.preventDefault(); //остановить обработку ссылки
    const newPath = navigationLink.pathname + navigationLink.hash; // ( / + # )
    // history.pushState({ page: navigationLink.hash }, '', '/newPath'); // добавляет новое состояние в историю браузера (state, title[, url])
    window.location = newPath;
  });
});

// function realisePageSwiching() {
//   var currentLocation = window.location.href; //отслеживание текущего URL
//   console.log(currentLocation);
//   const libraryPage = 'http://localhost:1234/#library';
//   if (libraryPage === currentLocation) {
//     refs.searchMovieForm.classList.remove('search-movie-form');
//     refs.libraryButtons.classList.add('navigation-link');
//   } else {
//     refs.searchMovieForm.classList.add('search-movie-form');
//     refs.libraryButtons.classList.remove('navigation-link');
//   }
// }
