const WATCHED = [];
const QUEUE = [];

localStorage.setItem('WATCHED', WATCHED);
localStorage.setItem('QUEUE', QUEUE);

const addToWatchedBtn = document.querySelector('.add-to-watched-btn');
const addToQueueBtn = document.querySelector('.add-to-queue-btn');

addToWatchedBtn.addEventListener('click', onAddToWatchedBtnClick);
addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);

checkWatchedStatus(data);
checkQueueStatus(data);

function checkWatchedStatus(data) {
    const watchedStorage = localStorage.getItem('WATCHED');

    if (watchedStorage.includes(data)) {
        addToWatchedBtn.textContent = 'REMOVE FROM WATCHED';
        return;
    }
}

function checkQueueStatus(data) {
    const queueStorage = localStorage.getItem('QUEUE');

    if (queueStorage.includes(data)) {
        addToQueueBtn.textContent = 'REMOVE FROM QUEUE';
        return;
    }
}

function onAddToWatchedBtnClick(event) {
    event.preventDefault();
    
    if (addToWatchedBtn.textContent === 'REMOVE FROM WATCHED') {
        let movieIndex = WATCHED.indexOf(data);
        WATCHED.splice(movieIndex, 1);
        addToWatchedBtn.textContent = 'ADD TO WATCHED';
        return;
    }

    return localStorage.getItem('WATCHED').push(data);
}

function onAddToQueueBtnClick(event) {
    event.preventDefault();
    
    if (addToQueueBtn.textContent === 'REMOVE FROM QUEUE') {
        let movieIndex = QUEUE.indexOf(data);
        QUEUE.splice(movieIndex, 1);
        addToQueueBtn.textContent = 'ADD TO QUEUE';
        return;
    }

    return localStorage.getItem('QUEUE').push(data);
}