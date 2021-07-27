import { BASE_URL, API_KEY, TRANDING_DAY, TRANDING_WEEK } from './fetchConst';

export function fetchPopularDayMovies() {
    return fetch(`${BASE_URL}/${TRANDING_DAY}?api_key=${API_KEY}`)
    .then(response => {
      return response.json();
    });
  }

  export function fetchPopularWeekMovies() {
    return fetch(`${BASE_URL}/${TRANDING_WEEK}?api_key=${API_KEY}`)
    .then(response => {
      return response.json();
    });
  }