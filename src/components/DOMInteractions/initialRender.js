const attack = require("./renderAttack.js");

function createBoard(belongsTo, displayShips) {
  let gameBoard = document.createElement("div");
  gameBoard.classList.add("gameBoard" + belongsTo, "gameBoard");
  for (let y = 0; y < 10; y++) {
    let divColumn = document.createElement("div");
    divColumn.classList.add("divColumn" + belongsTo, "divColumn");
    for (let x = 0; x < 10; x++) {
      let divRow = document.createElement("div");
      divRow.setAttribute("data-coordinates", [x, y]);
      divRow.classList.add("divRow" + belongsTo, "divRow");

      if (belongsTo == "player") {
        if (displayShips.flat().some((val) => val[0] == x && val[1] == y)) {
          divRow.classList.add("ship", "divRow-nohover");
          divRow.classList.remove("divRow");
        }
      }

      if (belongsTo == "computer") {
        divRow.addEventListener("click", attack, { once: true });
      }
      divColumn.appendChild(divRow);
    }

    gameBoard.insertBefore(divColumn, gameBoard.firstChild);
  }

  if (belongsTo == "player") {
    let rightPlayer = document.querySelector(".rightplayer");
    rightPlayer.appendChild(gameBoard);
  } else {
    let rightComputer = document.querySelector(".rightcomputer");
    // let computerDiv = document.querySelector(".computer");

    rightComputer.appendChild(gameBoard);
  }
}

module.exports = createBoard;
