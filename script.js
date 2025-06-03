const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
const winLine = document.getElementById('win-line');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

function playSound() {
    audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = 440;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || gameState[index]) {
        return;
    }

    playSound();
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('disabled');
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

    const win = checkWin();
    if (win) {
        drawWinLine(win);
        message.textContent = `¡${currentPlayer} gana!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = '¡Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno de ${currentPlayer}`;
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return combo;
        }
    }
    return null;
}

function drawWinLine(combo) {
    const boardRect = board.getBoundingClientRect();
    const startCell = document.querySelector(`.cell[data-index="${combo[0]}"]`).getBoundingClientRect();
    const endCell = document.querySelector(`.cell[data-index="${combo[2]}"]`).getBoundingClientRect();
    const x1 = startCell.left + startCell.width / 2 - boardRect.left;
    const y1 = startCell.top + startCell.height / 2 - boardRect.top;
    const x2 = endCell.left + endCell.width / 2 - boardRect.left;
    const y2 = endCell.top + endCell.height / 2 - boardRect.top;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    winLine.style.width = `${length}px`;
    winLine.style.left = `${x1}px`;
    winLine.style.top = `${y1}px`;
    winLine.style.transform = `rotate(${angle}deg)`;
    winLine.style.display = 'block';
}

function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = 'Turno de X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled', 'x', 'o');
    });
    winLine.style.display = 'none';
}

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);

message.textContent = 'Turno de X';
