const shipObj = require("./shipObj.js");

function gameBoard() {
  let missedShots = [];
  let shipsOnBoard = [];
  let sunkenShips = [];
  let unavailibleSquares = [];

  let listOfShips = [
    shipObj(2),
    shipObj(2),
    shipObj(2),
    shipObj(2),
    shipObj(2),
  ];

  let getShipsOnBoard = () => {
    let arrOfCoord = shipsOnBoard.map((val) => val.coordinates);

    return arrOfCoord;
  };

  let checkGameEnd = () => {
    if (sunkenShips.length == shipsOnBoard.length) {
      return true;
    }
  };

  let _generateValues = (shipLength) => {
    let xValue = Math.floor(Math.random() * (10 - shipLength + 1));
    let yValue = Math.floor(Math.random() * 10);
    let unavailibleString = JSON.stringify([unavailibleSquares]);

    for (let i = 0; i <= shipLength; i++) {
      let myValue = JSON.stringify([xValue + i, yValue]);
      if (unavailibleString.indexOf(myValue) != -1) {
        return _generateValues(shipLength);
      }
    }

    for (let i = -1; i < shipLength + 1; i++) {
      unavailibleSquares.push(
        [xValue + i, yValue],
        [xValue + i, yValue + 1],
        [xValue + i, yValue - 1]
      );
    }
    return [xValue, yValue];
  };

  let placeShip = () => {
    let xCoord;
    let yCoord;

    let cases = ["horizontal", "vertical"];
    let randomNum = Math.floor(Math.random() * 2);

    for (let ship of listOfShips) {
      [xCoord, yCoord] = _generateValues(ship.length);
      let squaresTakenByShip = [];
      for (let i = 0; i < ship.length; i++) {
        squaresTakenByShip.push([xCoord + i, yCoord]);
      }

      shipsOnBoard.push({ ship: ship, coordinates: squaresTakenByShip });
      squaresTakenByShip = [];
    }
  };

  let recieveAttack = (coordinates) => {
    if (checkGameEnd()) return "Game over";

    for (let obj of shipsOnBoard) {
      if (obj.ship.getHitScore() == "Ship sunked") {
        return "Ship sunked";
      }

      for (let arr of obj.coordinates) {
        if (arr[0] == coordinates[0] && arr[1] == coordinates[1]) {
          let result = obj.ship.hit();
          if (result == "Ship sunked") {
            sunkenShips.push(obj);
            if (checkGameEnd()) return "Game over";
            return;
          }
          return;
        }
      }
    }
    missedShots.push(coordinates);
  };

  return { placeShip, recieveAttack, getShipsOnBoard };
}

module.exports = gameBoard;
