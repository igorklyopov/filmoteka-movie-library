import { refs } from '../js/refs';

//////////////////////////// WATCHED /////////////////////////////////

refs.modal.addEventListener('click', onWatchedClick);

function onWatchedClick(e) {
  if (e.target.className !== 'add-to-watched-btn basic-button') {
    return;
  }
  console.dir(
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText,
  );
  const nameKey = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;

  const getObject = {
    title: 'WACHED',
    name: nameKey,
    img: imageURL,
    genre: genres,
    rating: rating,
  };

  localStorage.setItem(nameKey, JSON.stringify(getObject));
}

//////////////////////////// QUEUE //////////////////////////////////

refs.modal.addEventListener('click', onQueueClick);

function onQueueClick(e) {
  if (e.target.className !== 'add-to-queue-btn basic-button') {
    return;
  }
  const nameKey = e.target.offsetParent.childNodes[0].childNodes[3].childNodes[1].innerText;
  const imageURL = e.target.offsetParent.childNodes[0].childNodes[1].currentSrc;
  const genres =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[3].innerText;
  const rating =
    e.target.offsetParent.childNodes[0].children[1].children[1].children[1].children[0].children[0]
      .innerText;

  const getObject = {
    title: 'QUEUE',
    name: nameKey,
    img: imageURL,
    genre: genres,
    rating: rating,
  };
  localStorage.setItem(nameKey, JSON.stringify(getObject));
}
