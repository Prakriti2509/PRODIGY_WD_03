 let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  
  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = "white"; //

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => gameBoard[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}