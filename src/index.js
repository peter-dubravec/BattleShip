require("./style.css");

const playerObj = require("./components/playerObj.js");
const initialRender = require("./components/DOMInteractions/initialRender");

function gameLoop() {
  let player = playerObj();
  let computer = playerObj(true);
  initialRender("player", player.gameBoard.getShipsOnBoard());
  initialRender("computer", computer.gameBoard.getShipsOnBoard());

  let skuska = player.gameBoard.getShipsOnBoard();
  let x = 4;
  let y = 3;
}

gameLoop();
