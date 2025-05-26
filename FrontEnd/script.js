const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart-btn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6]
];

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
  });
}

function handleClick(event) {
  const cell = event.target;
  const index = Array.from(cells).indexOf(cell);

  if (board[index] === "" && isGameActive) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // qo‘shadi: class="x" yoki "o"

    if (checkWin()) {
      setTimeout(() => {
        alert(`${currentPlayer} yutdi!`);
      }, 100);
      isGameActive = false;
    } else if (!board.includes("")) {
      setTimeout(() => {
        alert("Durrang!");
      }, 100);
      isGameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

// 🧩 Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
