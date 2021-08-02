import { refs } from './refs';

export function onIncorrectInput() {
    refs.searchMovieForm.insertAdjacentHTML('afterend', '<p class="error-message">Search result not successful. Enter the correct movie name and </p>');
}
