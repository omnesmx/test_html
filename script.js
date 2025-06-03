const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || gameState[index]) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('disabled');

    if (checkWin()) {
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

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = 'Turno de X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
}

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);

message.textContent = 'Turno de X';
