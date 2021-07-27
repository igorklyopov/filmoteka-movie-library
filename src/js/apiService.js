const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '0425708b766634a264f7b84cc81ebcd7';
const SEARCH_MOVIE = 'search/movie'; //получение фильма по названию
const TRANDING_DAY = 'trending/movie/day'; //получение самых популярных фильмов за день
const TRANDING_WEEK = 'trending/movie/week'; //получение самых популярных фильмов за неделю

const movieId = 335988; //для примера, тестов
const searchQuery = 'transformers'; //для примера, тестов

// `${BASE_URL}/${TRANDING_DAY}?api_key=${API_KEY}`;//запрос для получения самых популярных фильмов
// `${BASE_URL}/${SEARCH_MOVIE}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;//запрос для получения фильма по названию

//  function fetchImages() {
//     return fetch(
//       `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`//запрос для получения полной информации об одном фильме
//     ).then(response => {
//       console.log(response.json());//тест
//       // return response.json();
//     });
//   }
export class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchMoviesBySearch() {
    console.log(this);
    return fetch(
      `${BASE_URL}/${SEARCH_MOVIE}?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
    ).then(response => {
      return response.json().then(data => {
        // this.page += 1;
        console.log(this);
      });
    });
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// export function fetchMoviesBySearch(searchQuery) {
//   return fetch(
//     `${BASE_URL}/${SEARCH_MOVIE}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`,
//   ).then(response => {
//     return response.json();
//   });
// }

export function fetchPopularDayMovies() {
  return fetch(`${BASE_URL}/${TRANDING_DAY}?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

export function fetchPopularWeekMovies() {
  return fetch(`${BASE_URL}/${TRANDING_WEEK}?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

// fetchImages()//тест
