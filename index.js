// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = '❌';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const gameArray = []

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    gameArray.push(cellIndex);

    if (checkWin()) {
        highlightWinningCells();
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.includes('')) {
        currentPlayer = currentPlayer === '❌' ? '🇴' : '❌';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = `It's a draw!`;
        gameActive = false;
    }

    if (gameArray.length == 5) {
        cells[gameArray[0]].classList.add('highlight');
    }

    if (gameArray.length > 5) {
        var tar = gameArray.shift();
        console.log("TAR: ", tar);
        gameBoard[tar] = '';
        cells[tar].textContent = '';
        cells[tar].classList.remove('highlight');
        !checkWin() ? cells[gameArray[0]].classList.add('highlight') : '';
    }

}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function highlightWinningCells() {
    winningConditions.forEach(condition => {
        if (condition.every(index => gameBoard[index] === currentPlayer)) {
            condition.forEach(index => {
                cells[index].classList.add('strike-through');
            });
        }
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
statusText.textContent = `Player ${currentPlayer}'s turn`;
