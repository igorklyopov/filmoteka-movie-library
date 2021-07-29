//Current URL locaton

var currentLocation = window.location.href; //отслеживание текущего URL
console.log(currentLocation);

const navigationLinks = document.getElementsByClassName('navigation-link'); //получение классов (массив)

[...navigationLinks].forEach(navigationLink => {
  //перебор массива
  navigationLink.addEventListener('click', function (e) {
    //навешивание слушателя
    e.preventDefault(); //остановить обработку ссылки
    const newPath = navigationLink.pathname + navigationLink.hash; // ( / + # )
    // history.pushState({ page: navigationLink.hash }, '', '/newPath'); // добавляет новое состояние в историю браузера (state, title[, url])
    window.location = newPath;
  });
});
