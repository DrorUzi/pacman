'use strict';
var SUPER_FOOD = '🍕'
var WALL = '🌵';
var CHERRY = '🍒'
var FOOD = '*';
var EMPTY = ' ';
var gIsVictorius;
var gBoard;
var gElResetBtn = document.querySelector('.reset-btn');
var gElMsg = document.querySelector('.msg');
var gGame = {
  score: 0,
  isOn: false
};
var gCherryIterval;

function init() {
  gCherryIterval = setInterval(() => {
    spreadCherry();
  }, 5000);

  gIsVictorius = false;
  gElMsg.style.display = 'none';
  gGame.score = 0;
  gElResetBtn.style.display = 'none'
  gFoodAmount = -1;
  gFoodColected = 0;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      } else if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2)
        || (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)) {
        board[i][j] = SUPER_FOOD;
      } else {
        board[i][j] = FOOD;
        gFoodAmount++;
      }
    }
  }
  return board;
}




function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  if (gIsVictorius) {
    document.querySelector('.msg').innerText = 'You Win!';
    gElMsg.style.display = 'block';
  } else {
    document.querySelector('.msg').innerText = 'You lose!'
    gElMsg.style.display = 'block';
  }
  gElResetBtn.style.display = 'block';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gCherryIterval)
}


// function spreadCherry() {
//   var cherryLocaitionI = getRandomIntInclusive(1, gBoard.length - 2);
//   var cherryLocaitionJ = getRandomIntInclusive(1, gBoard[0].length - 2);
//   var cherryPos = gBoard[cherryLocaitionI][cherryLocaitionJ]
//   if (cherryPos === EMPTY) {
//     gBoard[cherryLocaitionI][cherryLocaitionJ] = CHERRY
//     renderCell({ i: cherryLocaitionI, j: cherryLocaitionJ }, CHERRY);
//   }
// }

function spreadCherry() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === EMPTY) emptyCells.push({ i: i, j: j });
    }
  }
  if (emptyCells.length === 0) return;
  var randIdx = getRandomIntInclusive(1, emptyCells.length - 1);
  var cherryLocaition = emptyCells[randIdx];
  gBoard[cherryLocaition.i, cherryLocaition.j] === CHERRY;
  renderCell(cherryLocaition, CHERRY)

}

