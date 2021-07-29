import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './fetchConst'

export class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  basicQuery(searchParameter) {
    return `${BASE_URL}/${searchParameter}?api_key=${API_KEY}&page=${this.pageNumber}&language=en-US`
  }
  
    getmoviesBySearch() {
    return fetch(
      `${this.basicQuery(SEARCH_MOVIE)}&include_adult=false&query=${this.searchQuery}`,
    ).then(response => {
      return response.json().then(data => {
        // this.page += 1;
        return data.results;
      });
    });
  }

  getPopularDayMovies() {
    return fetch(`${this.basicQuery(TRANDING_DAY)}`)
      .then(response => {
        // this.page += 1;
      return response.json();
    });
  }

  getPopularWeekMovies() {
    return fetch(`${this.basicQuery(TRANDING_WEEK)}`)
      .then(response => {
        // this.page += 1;
      return response.json();
    });
  }

  incrementPage() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

