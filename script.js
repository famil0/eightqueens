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
        this.i = 8;
        this.placeOrRemove();
    }
}

let running = false;

const startBtn = document.querySelector('.start.btn');
startBtn.addEventListener('click', () => {
    if (running) return;
    toggle(startBtn);
    end = false;
    if (queens[0].i == 8 && queens[7].i == 8) {
        queenIdx = 0;
        backtrack();
        foundSolutions = 0;
    }
    else {
        queenIdx = 7;
        backtrack();
    }
});
const waitCheckbox = document.querySelector('#cbwait');
const milliseconds = document.querySelector('.ms').children[0];

function toggle(element) {
    element.classList.toggle('disabled');
}

let board = [];
let rows = document.querySelectorAll('.row');
for (let i = 0; i < rows.length; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
        board[i][j] = rows[i].children[j];
    }
}
let queens = [];
for (let i = 0; i < 8; i++) {
    queens[i] = new Queen(8, i);
    queens[i].placeOrRemove();
}

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
            if (queenIdx == 8) {
                end = true;
                foundSolutions++;
            }
        }
        if (queens[0].i == 8 && queens[7].i == 8) {
            break;
        }
    }
    running = false;
     toggle(startBtn);
}


function goodPosition(i, j) {
    for (let k = 0; k < 8; k++) {
        if (i == k) continue;
        if (board[k][j].classList.contains('queen')) return false;
    }
    for (let k = 0; k < 8; k++) {
        if (j == k) continue;
        if (board[i][k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < 8; k++) {
        if (i + k >= 8 || j + k >= 8) break;
        if (board[i + k][j + k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < 8; k++) {
        if (i - k < 0 || j - k < 0) break;
        if (board[i - k][j - k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < 8; k++) {
        if (i + k >= 8 || j - k < 0) break;
        if (board[i + k][j - k].classList.contains('queen')) return false;
    }
    for (let k = 1; k < 8; k++) {
        if (i - k < 0 || j + k >= 8) break;
        if (board[i - k][j + k].classList.contains('queen')) return false;
    }
    return true;
}

function placeOrRemoveQueen(i, j) {
    if (i < 0) return;
    board[i][j].classList.toggle('queen');
}