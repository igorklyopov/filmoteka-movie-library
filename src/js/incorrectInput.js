import { refs } from './refs';

export function onIncorrectInput() {
    refs.searchErrorMessage.innerText = 'Search result not successful. Enter the correct movie name and try again!';
    setTimeout(() => {
        refs.searchErrorMessage.innerText = ''
    },3000)
}
