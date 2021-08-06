import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './fetchConst';

class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
  }

  basicQuery(searchParameter) {
    return `${BASE_URL}/${searchParameter}?api_key=${API_KEY}&page=${this.pageNumber}&language=en-US`;
  }

  getmoviesBySearch() {
    return fetch(
      `${this.basicQuery(SEARCH_MOVIE)}&include_adult=false&query=${this.searchQuery}`,
    ).then(response => {
      return response.json().then(data => {
        data.results.forEach(function (item) {
          const shortDate = item.release_date.slice(0, 4);

          if (item.genre_ids.length > 2) {
            let shortGenres = item.genre_ids.slice(0, 2);
            shortGenres.push(' Other');
            item.genre_ids = shortGenres;
          }

          item.release_date = shortDate;
          return;
        });

        return data;
      });
    });
  }
  getPopularDayMovies() {
    return fetch(`${this.basicQuery(TRANDING_DAY)}`).then(response => {
      return response.json();
    });
  }

  getPopularWeekMovies() {
    return fetch(`${this.basicQuery(TRANDING_WEEK)}`).then(response => {
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

export default new MoviesApiService()