import { refs } from './refs';

export function showErrorMessage(message) {
    refs.searchErrorMessage.innerText = message;
    setTimeout(() => {
        refs.searchErrorMessage.innerText = ''
    },3000)
}
