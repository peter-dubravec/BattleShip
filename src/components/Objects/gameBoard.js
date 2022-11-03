const shipObj = require("./shipObj.js");
const createBoard = require("../DOMInteractions/render.js");
const deletePlayerBoard = require("../DOMInteractions/deletePlayerBoard.js");
const gameOver = require("../DOMInteractions/gameOver.js");
const deleteBoards = require("../DOMInteractions/deleteBoards.js");
const deleteWinner = require("../DOMInteractions/deleteWinner.js");
const {
  renderMissedShot,
  renderHit,
} = require("../DOMInteractions/renderChange.js");

function gameBoard(isComputer) {
  let sunkenShips = [];
  let shipsOnBoard = [];
  let availibleSqaures = [];

  let _generateShips = () => {
    let listOfShips = [
      shipObj(9),
      // shipObj(3),
      // shipObj(3),
      // shipObj(2),
      // shipObj(2),
      // shipObj(1),
      // shipObj(1),
      // shipObj(1),
    ];
    return listOfShips;
  };

  let _generateAvailibleSquares = () => {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        availibleSqaures.push([x, y]);
      }
    }
  };

  let _getShipsOnBoard = () => {
    let arrOfCoord = shipsOnBoard.map((val) => val.coordinates);
    return arrOfCoord;
  };

  let checkGameEnd = () => {
    if (sunkenShips.length == shipsOnBoard.length) {
      console.log(true);
      gameOver(isComputer);
      return true;
    }
    return false;
  };

  let _generateValuesVertical = (shipLength, triedVertical = []) => {
    let randomValue;
    let coord;
    let availibleSquaresStrg = JSON.stringify(availibleSqaures);

    if (triedVertical.length == 0) {
      randomValue = Math.floor(Math.random() * availibleSqaures.length);
      coord = availibleSqaures[randomValue];
    } else {
      let newArray;
      triedVertical.forEach((arr) => {
        newArray = availibleSqaures.filter(
          (elem) => elem[0] != arr[0] || elem[1] != arr[1]
        );
        randomValue = Math.floor(Math.random() * newArray.length);
        coord = newArray[randomValue];
      });
    }

    for (let i = 0; i <= shipLength; i++) {
      let coordStringified = JSON.stringify([coord[0], coord[1] + i]);
      triedVertical.push(coord);
      if (availibleSquaresStrg.indexOf(coordStringified) == -1) {
        return _generateValuesVertical(shipLength, triedVertical);
      }
    }

    for (let i = -1; i < shipLength + 1; i++) {
      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] != val[0] || coord[1] + i != val[1]
      );

      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] + 1 != val[0] || coord[1] + i != val[1]
      );

      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] - 1 != val[0] || coord[1] + i != val[1]
      );
    }
    return [coord[0], coord[1]];
  };

  let _generateValuesHorizontal = (shipLength, triedHorizontal = []) => {
    let randomValue;
    let coord;
    let availibleSquaresStrg = JSON.stringify(availibleSqaures);
    
    if (triedHorizontal.length == 0) {
      randomValue = Math.floor(Math.random() * availibleSqaures.length);
      coord = availibleSqaures[randomValue];
    } else {
      let newArray;
      triedHorizontal.forEach((arr) => {
        newArray = availibleSqaures.filter(
          (elem) => elem[0] != arr[0] || elem[1] != arr[1]
        );
        randomValue = Math.floor(Math.random() * newArray.length);
        coord = newArray[randomValue];
      });
    }

    for (let i = 0; i <= shipLength; i++) {
      let coordStringified = JSON.stringify([coord[0] + i, coord[1]]);
      if (availibleSquaresStrg.indexOf(coordStringified) == -1) {
        triedHorizontal.push(coord);
        return _generateValuesHorizontal(shipLength, triedHorizontal);
      }
    }

    for (let i = -1; i < shipLength + 1; i++) {
      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] + i != val[0] || coord[1] != val[1]
      );

      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] + i != val[0] || coord[1] + 1 != val[1]
      );

      availibleSqaures = availibleSqaures.filter(
        (val) => coord[0] + i != val[0] || coord[1] - 1 != val[1]
      );
    }

    return [coord[0], coord[1]];
  };

  let placeShip = () => {
    let xCoord;
    let yCoord;

    let cases = ["horizontal", "vertical"];
    let listOfShips = _generateShips();
    for (let ship of listOfShips) {
      let randomNum = Math.floor(Math.random() * 2);
      let randomChoice = cases[randomNum];
      let squaresTakenByShip = [];

      switch (randomChoice) {
        case "horizontal":
          [xCoord, yCoord] = _generateValuesHorizontal(ship.length);

          for (let i = 0; i < ship.length; i++) {
            squaresTakenByShip.push([xCoord + i, yCoord]);
          }

          shipsOnBoard.push({ ship: ship, coordinates: squaresTakenByShip });

          break;

        case "vertical":
          [xCoord, yCoord] = _generateValuesVertical(ship.length);

          for (let i = 0; i < ship.length; i++) {
            squaresTakenByShip.push([xCoord, yCoord + i]);
          }

          shipsOnBoard.push({ ship: ship, coordinates: squaresTakenByShip });

          break;
      }
    }
  };

  let recieveAttack = (coordinates, isComputer) => {
    for (let obj of shipsOnBoard) {
      for (let arr of obj.coordinates) {
        if (arr[0] == coordinates[0] && arr[1] == coordinates[1]) {
          if (obj.ship.hit() == "Ship sunked") {
            sunkenShips.push(obj);
          }

          isComputer
            ? renderHit("computer", coordinates)
            : renderHit("player", coordinates);

          checkGameEnd();
          return;
        }
      }
    }

    return isComputer
      ? renderMissedShot("computer", coordinates)
      : renderMissedShot("player", coordinates);
  };

  let randomize = () => {
    shipsOnBoard = [];
    availibleSqaures = [];
    _generateAvailibleSquares();
    placeShip();
    deletePlayerBoard();
    createBoard("player", _getShipsOnBoard());
  };

  let restart = () => {
    sunkenShips = [];
    shipsOnBoard = [];
    availibleSqaures = [];
    deleteWinner();
    _generateAvailibleSquares();
    placeShip();
    deleteBoards(isComputer);
    isComputer
      ? createBoard("computer", _getShipsOnBoard())
      : createBoard("player", _getShipsOnBoard());
  };

  (function initialBoard() {
    _generateAvailibleSquares();
    placeShip();
    isComputer
      ? createBoard("computer", _getShipsOnBoard())
      : createBoard("player", _getShipsOnBoard());
  })();

  return { recieveAttack, randomize, restart, checkGameEnd };
}

module.exports = gameBoard;
