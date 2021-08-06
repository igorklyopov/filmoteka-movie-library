import './sass/main.scss';
import { refs } from './js/refs';
import './js/onSearch';
import './js/modalCloseAction';
import './js/toTopButton';
import './js/addMovieToLibrary';
import './js/theme-switcher';
import './js/spa';
import {
  onWeekBtnClick,
  onDayBtnClick,
  loadMorePopMovies,
} from './js/popMoviesloadFunctions';

refs.weekBtn.addEventListener('click', onWeekBtnClick);
refs.dayBtn.addEventListener('click', onDayBtnClick);

const moviesLoadObserver = new IntersectionObserver(makeInfiniteScrolling, { threshold: 0 });

function makeInfiniteScrolling([entrie]) {
  if (!entrie.isIntersecting) {
    return;
  }
  loadMorePopMovies();
}

moviesLoadObserver.observe(refs.infiniteScrollingAnchor);
