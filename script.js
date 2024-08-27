const board = document.getElementById('board');
const gridsize = document.getElementById('gridsize');
const movescounter = document.querySelector('.moves');
const timedisplay = document.querySelector('.time');

const endstate = Array.from({ length: 15 }, (_, i) => i + 1).concat(NaN);
let array = [...endstate];
let movecount = 0;
let timer;
let starttime;
let timerstarted = false;
let gamewon = false;

function init() {
    board.innerHTML = ''; 
    board.style.gridTemplateColumns = `repeat(${gridsize.value}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${gridsize.value}, 1fr)`;

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
    let size = parseInt(gridsize.value);
    let row = Math.floor(index / size);
    let col = Math.floor(index % size);
    let emptyrow = Math.floor(emptyindex / size);
    let emptycol = emptyindex % size;

    if (row === emptyrow) {
        if (col < emptycol) {
            for (let i = emptycol; i > col; i--) {
                [array[row * size + i], array[row * size + i - 1]] = [array[row * size + i - 1], array[row * size + i]];
            }
        } 
        else if (col > emptycol) {
            for (let i = emptycol; i < col; i++) {
                [array[row * size + i], array[row * size + i + 1]] = [array[row * size + i + 1], array[row * size + i]];
            }
        }
    } 
    else if (col === emptycol) {
        if (row < emptyrow) {
            for (let i = emptyrow; i > row; i--) {
                [array[i * size + col], array[(i - 1) * size + col]] = [array[(i - 1) * size + col], array[i * size + col]];
            }
        } 
        else if (row > emptyrow) {
            for (let i = emptyrow; i < row; i++) {
                [array[i * size + col], array[(i + 1) * size + col]] = [array[(i + 1) * size + col], array[i * size + col]];
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
        let size = parseInt(gridsize.value);
        
        if (size % 2 !== 0) {
            return inversions % 2 === 0;
        } else {
            let emptyrow = Math.floor(arr.findIndex(num => isNaN(num)) / size) + 1;
            return (inversions + emptyrow) % 2 === 0;
        }
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
    let size = parseInt(gridsize.value);
    let completedstate = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(NaN);
    if (!gamewon) {
        if (array.every((num, index) => {
            if (isNaN(num)) {
                return isNaN(completedstate[index]);
            }
            return num === completedstate[index];
        })) {
            clearInterval(timer);
            gameoverdiv.style.zIndex = '1000';
            gameoverdiv.style.visibility = 'visible';
            gameoverdiv.classList.remove('rotate-180');
            gamewon = true;
        } else if (array.slice().reverse().every((num, index) => {
            if (isNaN(num)) {
                return isNaN(completedstate[index]);
            }
            return num === completedstate[index];
        })) {
            clearInterval(timer);
            gameoverdiv.style.zIndex = '1000';
            gameoverdiv.style.visibility = 'visible';
            gameoverdiv.classList.add('rotate-180');
            gamewon = true;
        }
    } else {
        gameoverdiv.style.zIndex = '-1';
        gameoverdiv.style.visibility = 'hidden';
        gameoverdiv.classList.remove('rotate-180');
        gamewon = false;
        timerstarted = false;
        movecount = 0;
        timedisplay.innerText = 'Time: 0:00:00';
        movescounter.innerText = `Moves: ${movecount}`;
        array = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(NaN);
        shuffle(array);
        init();
    }
}

gridsize.addEventListener('input', () => {
    const title = document.querySelector('h1');
    const gameoverdiv = document.querySelector('.gameover');
    let size = parseInt(gridsize.value);
    title.innerText = `${size * size - 1} PUZZLE`
    array = Array.from({ length: size * size - 1 }, (_, i) => i + 1).concat(NaN);
    shuffle(array);
    gameoverdiv.style.zIndex = '-1';
    gameoverdiv.style.visibility = 'hidden';
    gameoverdiv.classList.remove('rotate-180');
    gamewon = false;
    timerstarted = false;
    movecount = 0;
    clearInterval(timer);
    timedisplay.innerText = 'Time: 0:00:00';
    movescounter.innerText = `Moves: ${movecount}`;
    init();
});

shuffle(array);
init();