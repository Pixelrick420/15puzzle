const board = document.getElementById('board');
const message = document.getElementById('message');
const movescounter = document.querySelector('.moves');
const timedisplay = document.querySelector('.time');

const endstate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, NaN];
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, NaN];
let movecount = 0;
let timer;
let starttime;
let timerstarted = false;
let gamewon = false;

function init() {
    board.innerHTML = ''; 
    array.forEach((num, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (isNaN(num)) {
            cell.classList.add('void');
            cell.innerText = '';
        } else {
            cell.innerText = num;
            cell.classList.remove('void');
            cell.addEventListener('click', () => handleclick(i));
        }
        board.appendChild(cell);
    });
}

function handleclick(index) {
    if(!timerstarted){
        starttimer();
        timerstarted = true;
    }
    let emptyindex = array.findIndex(num => isNaN(num));
    let row = Math.floor(index / 4);
    let col = Math.floor(index % 4);
    let emptyrow = Math.floor(emptyindex / 4);
    let emptycol = emptyindex % 4;

    if (row === emptyrow) {
        if (col < emptycol) {
            for (let i = emptycol; i > col; i--) {
                [array[row * 4 + i], array[row * 4 + i - 1]] = [array[row * 4 + i - 1], array[row * 4 + i]];
            }
        } 
        else if (col > emptycol) {
            for (let i = emptycol; i < col; i++) {
                [array[row * 4 + i], array[row * 4 + i + 1]] = [array[row * 4 + i + 1], array[row * 4 + i]];
            }
        }
    } 
    else if (col === emptycol) {
        if (row < emptyrow) {
            for (let i = emptyrow; i > row; i--) {
                [array[i * 4 + col], array[(i - 1) * 4 + col]] = [array[(i - 1) * 4 + col], array[i * 4 + col]];
            }
        } 
        else if (row > emptyrow) {
            for (let i = emptyrow; i < row; i++) {
                [array[i * 4 + col], array[(i + 1) * 4 + col]] = [array[(i + 1) * 4 + col], array[i * 4 + col]];
            }
        }
    }

    emptyindex = index;
    movecount++;
    movescounter.innerText = `Moves: ${movecount}`;
    updateboard();
    checkwin();
}


function updateboard() {
    board.innerHTML = ''; 
    array.forEach((num, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (isNaN(num)) {
            cell.classList.add('void');
            cell.innerText = '';
        } else {
            cell.innerText = num;
            cell.classList.remove('void');
            cell.addEventListener('click', () => handleclick(i));
        }
        board.appendChild(cell);
    }); 
}

function countinversions(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (!isNaN(arr[i]) && !isNaN(arr[j]) && arr[i] > arr[j]) {
                inv++;
            }
        }
    }
    return inv;
}

function shuffle(array) {
    function issolvable(arr) {
        let inversions = countinversions(arr);
        let emptyrow = Math.floor(array.findIndex(num => isNaN(num)) / 4) + 1; 
        return (inversions + emptyrow) % 2 === 0;
    }

    do {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
    } while (!issolvable(array));
}

function starttimer() {
    starttime = Date.now();
    timer = setInterval(() => {
        const elapsed = Date.now() - starttime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const microseconds = Math.floor((elapsed % 1000) / 10); 
        timedisplay.innerText = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}.${microseconds.toString().padStart(2, '0')}`;
    }, 10); 
}

function checkwin() {
    const gameoverdiv = document.querySelector('.gameover');
    if (!gamewon) {
        if (array.every((num, index) => {
            if (isNaN(num)) {
                return isNaN(endstate[index]);
            }
            return num === endstate[index];
        })) {
            clearInterval(timer);
            const finaltime = Math.floor((Date.now() - starttime) / 1000);
            const minutes = Math.floor(finaltime / 60);
            const seconds = finaltime % 60;
            const milliseconds = Math.floor((finaltime % 1000) / 10);
            document.getElementById('finaltime').innerText = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
            gameoverdiv.style.zIndex = '1000';
            gameoverdiv.style.visibility = 'visible';
            gamewon = true;
        }
    } 
    else{
        gameoverdiv.style.zIndex = '-1';
        gameoverdiv.style.visibility = 'hidden';
        gamewon = false;
        timerstarted = false;
        movecount = 0;
        timedisplay.innertext = 'Time: 0:00:00';
        movescounter.innerText = `Moves: ${movecount}`;
        shuffle(array);
        init(); 
    }
}

shuffle(array);
init();