console.log('modal.js start');

const ref5 = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  //backdrop: document.querySelector('.js-backdrop'),
};

ref5.openModalBtn.addEventListener('click', onOpenModal);
ref5.closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  document.body.classList.add('show-modal');
}

function onCloseModal(event) {
  document.body.classList.remove('show-modal');
}
