import { refs } from "./refs";

export default function switchLoadingDots(switchParams) {
  if (switchParams === 'on') {
    refs.loadingDots.classList.remove('is-hidden');
  } else if (switchParams === 'off') {
    refs.loadingDots.classList.add('is-hidden');
  }
}