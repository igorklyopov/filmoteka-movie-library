import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './fetchConst'

export class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    // this.page = 1;
  }
  fetchMoviesBySearch() {
    return fetch(
      `${BASE_URL}/${SEARCH_MOVIE}?api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`,
    ).then(response => {
      return response.json().then(data => {
        // this.page += 1;
        return data.results;
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
