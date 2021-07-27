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

// fetchImages()//тест