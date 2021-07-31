import { BASE_URL, API_KEY, SEARCH_MOVIE, TRANDING_DAY, TRANDING_WEEK } from './fetchConst';
import { refs } from '../js/refs';
// console.log(refs.imgCard);

// const imgurl = document.querySelector('.img-card-library');
// console.log(imgurl);

export class MoviesApiService {
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

        // this.page += 1;
        return data.results;
      });
    });
  }
  getPopularDayMovies() {
    return fetch(`${this.basicQuery(TRANDING_DAY)}`).then(response => {
      return response.json().then(res => {
        res.results.forEach(function (i) {
          const shortDate = i.release_date;
          if (shortDate !== undefined) {
            const shortDatePop = i.release_date.slice(0, 4);
            i.release_date = shortDatePop;
          } else {
            i.release_date = 'Soon';
          }
          if (i.genre_ids.length > 2) {
            let shortGenres = i.genre_ids.slice(0, 2);
            shortGenres.push(' Other');
            i.genre_ids = shortGenres;
          }
          return;
        });
        return res;
      });
    });
  }

  getPopularWeekMovies() {
    return fetch(`${this.basicQuery(TRANDING_WEEK)}`).then(response => {
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
