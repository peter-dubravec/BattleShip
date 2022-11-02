const gameBoardObj = require("./gameBoard.js");

function Player(isComputer = false) {
  let gameBoard = gameBoardObj(isComputer);
  let availibleCoordinates = [];

  if (isComputer == true) {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        availibleCoordinates.push([x, y]);
      }
    }
  }

  function _randomCoordinates() {
    let randomNum = Math.floor(Math.random() * availibleCoordinates.length);
    return availibleCoordinates.splice(randomNum, 1).flat();
  }

  let attack = (enemy, coordinates) => {
    if (isComputer == true) {
      let randomCoordinates = _randomCoordinates();
      enemy.gameBoard.recieveAttack(randomCoordinates, enemy.isComputer);
      return;
    }

    enemy.gameBoard.recieveAttack(coordinates, enemy.isComputer);
  };

  return { attack, gameBoard, isComputer };
}

module.exports = Player;
