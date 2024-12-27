const board = document.querySelector('.board');
let turn = 'O';
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const boardArray = new Array(9).fill('E');

function handleCellClick(event) {
    const clickedCell = event.target;
    
    if (clickedCell.classList.contains('cell') && boardArray[parseInt(clickedCell.id)] === 'E') {
        clickedCell.innerHTML = turn;
        boardArray[parseInt(clickedCell.id)] = turn;

        // Check for a draw first before checking for a win
        if (boardArray.every(cell => cell !== 'E')) {
            announceDraw();
            return; // Stop further processing (no need to check for win after a draw)
        }

        // Check if the current player wins
        if (checkWin()) {
            announceWin(turn);
            board.removeEventListener('click', handleCellClick); // Disable further clicks
        }

        // Change turn to the other player
        turn = turn === 'O' ? 'X' : 'O';
    }
}

board.addEventListener('click', handleCellClick);

function checkWin() {
    for (let [idx0, idx1, idx2] of winningCombination) {
        if (
            boardArray[idx0] !== 'E' &&
            boardArray[idx0] === boardArray[idx1] &&
            boardArray[idx1] === boardArray[idx2]
        ) {
            return true; // Win found
        }
    }
    return false; // No win found
}

// ReStart Button
const reStartButton = document.querySelector('#restart');
reStartButton.addEventListener('click', function() {
    // Clear the board visually
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear the content of each cell
    });

    // Reset the game state
    boardArray.fill('E'); // Reset the board array
    turn = 'O'; // Reset the turn to the starting player
    board.addEventListener('click', handleCellClick); // Re-enable click events
});

function announceWin(player) {
    const element = document.createElement('h1');
    element.classList.add(
        'text-4xl', // Large text size
        'font-bold', // Bold text
        'text-center', // Center alignment
        'text-purple-600', // Purple text color
        'mt-6', // Margin on top
        'animate-bounce' // Bounce animation for emphasis
    );
    element.innerText = `${player} wins! 🎉`;
    document.querySelector('.board-container').appendChild(element);
}

function announceDraw() {
    const element = document.createElement('h1');
    element.classList.add(
        'text-4xl',
        'font-bold',
        'text-center',
        'text-red-600', // Red text for draw
        'mt-6',
        'animate-pulse' // Pulse animation for draw
    );
    element.innerText = 'It\'s a draw! 🤝';
    document.querySelector('.board-container').appendChild(element);
}
