const gameBoardObj = require("./gameBoard.js");

function Player(isComputer = false) {
  let gameBoard = gameBoardObj();

  let firedShots = [];
  gameBoard.placeShip();

  function _randomCoordinates() {
    let xValue = Math.floor(Math.random() * 10);
    let yValue = Math.floor(Math.random() * 10);
    let result = firedShots.some((a) => a[0] === xValue && a[1] == yValue);
    if (result) {
      return _randomCoordinates();
    }
    return [xValue, yValue];
  }

  let attack = (enemy, coordinates) => {
    if (isComputer == true) {
      let randomCoordinates = _randomCoordinates();
      enemy.gameBoard.recieveAttack(randomCoordinates);
      return;
    }

    enemy.gameBoard.recieveAttack(coordinates);
  };

  return { attack, gameBoard };
}

module.exports = Player;
