import { refs } from './refs';
import { onDayBtnClick } from './popMoviesloadFunctions';

export function showErrorMessage(message) {
    refs.searchErrorMessage.innerText = message;
    onDayBtnClick()
    setTimeout(() => {
        refs.searchErrorMessage.innerText = ''
    },3000)
}
