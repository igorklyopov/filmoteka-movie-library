export default function buttonSwitcher(activeBtn, inActiveBtn) {
    activeBtn.setAttribute('disabled', "disabled");
    inActiveBtn.removeAttribute('disabled');
  
    activeBtn.classList.add('is-active');
    inActiveBtn.classList.remove('is-active');
}