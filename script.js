// Récupérer mon plateau de jeu
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const announce = document.querySelector('.announce');
const reset = document.querySelector('.reset');

let currentPlayer = "x";

const winCombos = [
  // Victoires en ligne
  [0,1,2],
  [3,4,5],
  [6,7,8],
  // Victoires en colonnes
  [0,3,6],
  [1,4,7],
  [2,5,8],
  // Victoires en horizontal
  [0,4,8],
  [2,4,6]
];

function checkWin() {
  // On exécute une boucle sur chaque élément de mon tableau de combinaisons jusqu'à rencontrer un combo gagnant, alors ça retourne TRUE. Sinon, il va jusqu'à la fin et il retourne FALSE si le dernier n'est pas bon.
  return winCombos.some(combo => {
    // Every va exécuter une fonction sur chaque élément de ma combinaison et on va vérifier que la cellule correspondante à chaque index de ma combinaison est à chaque fois le même signe du joueur.
    return combo.every(index => cells[index].textContent === currentPlayer);
  })
}

function checkDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function switchPlayer() {
  if(currentPlayer == "x") {
    currentPlayer = "o";
  } else if (currentPlayer == "o") {
    currentPlayer = "x";
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    currentPlayer = "x";
    announce.textContent = "";
    board.addEventListener('click', handleClick);
  });
}


//* 2- Je détermine les actions qu'entrainent mon CLICK
function handleClick(event) {
  const cell = event.target;

  if(!cell.classList.contains('cell')) return;

  if (event.target.textContent === "") {
    cell.textContent = currentPlayer;
  } else {
    return;
  }

  if (checkWin()) {
    announce.textContent = currentPlayer + " a gagné";
    board.removeEventListener("click", handleClick);
  } else if (checkDraw()) {
    announce.textContent = "Egalité !";
    board.removeEventListener("click", handleClick);
  }
  switchPlayer();
}


//* 1- Je veux ajouter le phénomène de clic sur mon board
board.addEventListener('click', handleClick);

reset.addEventListener('click', resetGame);