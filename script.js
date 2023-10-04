class Queen {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    placeOrRemove() {
        placeOrRemoveQueen(this.i, this.j);
    }

    move() {
        this.placeOrRemove();
        this.i--;
        this.placeOrRemove();
    }

    reset() {
        this.i = n;
        this.placeOrRemove();
    }
}

let running = false;

const startBtn = document.querySelector('.start.btn');
startBtn.addEventListener('click', () => {
    if (running) return;
    toggle(startBtn);
    end = false;
    if (queens[0].i == n && queens[n - 1].i == n) {
        queenIdx = 0;
        backtrack();
        foundSolutions = 0;
    }
    else {
        queenIdx = n - 1;
        backtrack();
    }
});
const waitCheckbox = document.querySelector('#cbwait');
const milliseconds = document.querySelector('.ms').children[0];
const queensNumber = document.querySelector('.queensnumber').children[0];
queensNumber.addEventListener('input', () => {
    if (queensNumber.innerHTML == '') return;
    n = parseInt(queensNumber.innerHTML);
    newBoard();
});

function toggle(element) {
    element.classList.toggle('disabled');
}

let board = [];
let rows = document.querySelectorAll('.row');
let n = parseInt(queensNumber.innerHTML);
let queens = [];
newBoard();

let queenIdx = 0;
let end = false;
let foundSolutions = 0;
async function backtrack() {
    running = true;
    while (!end) {
        if (!waitCheckbox.checked && milliseconds.innerHTML != "0" && milliseconds.innerHTML != "") {
            await new Promise(res => setTimeout(res, parseInt(milliseconds.innerHTML)));
        }
        let queen = queens[queenIdx];
        queen.move();
        if (queen.i == -1) {
            queen.reset();
            queen = queens[queenIdx--];
        }
        else if (goodPosition(queen.i, queen.j)) {
            queenIdx++;
            if (queenIdx == n) {
                end = true;
                foundSolutions++;
            }
        }
        if (queens[0].i == n && queens[n - 1].i == n) {
            break;
        }
    }
    running = false;
    toggle(startBtn);
}


function goodPosition(i, j) {
    for (let k = 0; k < n; k++) {
        if (i == k) continue;
        if (board[k][j].classList.contains('queen')) return false;
    }
    for (let k = 0; k < n; k++) {
        if (j == k) continue;
        if (board[i][k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < n; k++) {
        if (i + k >= n || j + k >= n) break;
        if (board[i + k][j + k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < n; k++) {
        if (i - k < 0 || j - k < 0) break;
        if (board[i - k][j - k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < n; k++) {
        if (i + k >= n || j - k < 0) break;
        if (board[i + k][j - k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < n; k++) {
        if (i - k < 0 || j + k >= n) break;
        if (board[i - k][j + k].classList.contains('queen')) return false;
    }
    return true;
}

function newBoard() {
    document.querySelector(':root').style.setProperty('--N', n);
    if (queens.length > 0) {
        queens.forEach(q => {
            q.placeOrRemove();
        });
    }
    board = [];
    for (let i = 8 - n; i <= 8; i++) {
        board[i - (8 - n)] = [];
        for (let j = 0; j < n; j++) {
            board[i - (8 - n)][j] = rows[i].children[j];
        }
    }
    queens = [];
    for (let i = 0; i < n; i++) {
        queens[i] = new Queen(n, i);
        queens[i].placeOrRemove();
    }
}

function placeOrRemoveQueen(i, j) {
    if (i < 0) return;
     board[i][j].classList.toggle('queen');
}