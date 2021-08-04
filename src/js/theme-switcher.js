import { refs } from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const body = document.querySelector('body');
const defaultTheme = body.classList.add('light-theme');

const button = document.querySelector('#theme-switch-toggle');
button.onchange = function () {
  if (button.checked === true) {
    body.style.color = 'var(--secondary-text-color)';
    refs.nameSurname.style.color = 'var(--secondary-text-color)';
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    localStorage.setItem('theme-color', Theme.DARK);
  } else {
    body.style.color = '';
    refs.nameSurname.style.color = '';
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme-color', Theme.LIGHT);
  }
};
const savedTheme = localStorage.getItem('theme-color');
if (savedTheme === Theme.DARK) {
  button.checked = true;
  body.classList.add('dark-theme');
}
if (savedTheme === Theme.LIGHT) {
  button.checked = false;
  body.classList.add('light-theme');
}
