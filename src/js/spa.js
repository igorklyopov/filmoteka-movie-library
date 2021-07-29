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
    refs.formContainer.innerHTML = `
      <ul class="list library-nav-list">
        <li class="library-nav-item">
          <a class="link library-nav-button">Watched</a>
        </li>
        <li class="library-nav-item">
          <a class="link library-nav-button">Queue</a>
        </li>
      </ul>
    `;
  } else {
    refs.formContainer.innerHTML = `
      <form class="search-movie-form">
        <div class="search-movie-input-wrap">
          <label class="search-movie-label">
            <span class="visually-hidden">Movie search</span>
            <input type="text" name="query" class="search-movie-input" placeholder="Поиск фильмов" />
          </label>
          <button type="submit" class="search-movie-button">
            <svg class="search-icon" width="12" height="12">
              <use href="./images/sprite.svg#icon-search"></use>
            </svg>
          </button>
        </div>
      </form>
    `;
    document.querySelector('.search-movie-form').addEventListener('submit', onSearch);
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
