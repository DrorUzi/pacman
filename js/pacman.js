var gPacman;
var PACMAN = '<img src = "image/pacman.gif" class="pacman"/>';

var gFoodAmount = null;
var gFoodColected = null;

var gDeadGhosts = [];

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  if (nextCell === CHERRY) updateScore(10);

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    gFoodColected++;
    if (gFoodColected === gFoodAmount) {
      gIsVictorius = true;
      gameOver();

    }
  } if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return
    gPacman.isSuper = true;
    hendleSuper();

  }

  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      killGhost(nextLocation);

    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }



  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}


function hendleSuper() {
  var ghostColors = [];
  for (var i = 0; i < gGhosts.length; i++) {
    ghostColors.push(gGhosts[i].color);
    gGhosts[i].color = 'deeppink';
    renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))

  }


  setTimeout(() => {
    gPacman.isSuper = false;
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = ghostColors[i];
    }
    for (var i = 0; i < gDeadGhosts.length; i++) {
      gGhosts.push(gDeadGhosts[i]);
      gGhosts[i].color = getRandomColor();
    }
  }, 5000)
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      PACMAN = `<img src="image/pacman.gif" class="pacman" style="transform: rotate(270deg)"/>`;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      PACMAN = `<img src="image/pacman.gif" class="pacman" style="transform: rotate(90deg)"/>`;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      PACMAN = `<img src="image/pacman.gif" class="pacman" style="transform: rotate(180deg)"/>`;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      PACMAN = `<img src="image/pacman.gif" class="pacman" style="transform: rotate(0deg)"/>`;
      break;
    default: return null;
  }

  return nextLocation;
}