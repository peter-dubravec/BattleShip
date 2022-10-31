const shipObj = require("./shipObj.js");

function gameBoard() {
  let missedShots = [];
  let shipsOnBoard = [];
  let sunkenShips = [];
  let unavailibleSquares = [];

  let listOfShips = [
    shipObj(1),
    shipObj(2),
    shipObj(2),
    shipObj(2),
    shipObj(3),
    shipObj(4),
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

  let _generateValuesVertical = (shipLength) => {
    let xValue = Math.floor(Math.random() * 10);
    let yValue = Math.floor(Math.random() * (10 - shipLength + 1));

    let unavailibleString = JSON.stringify([unavailibleSquares]);

    for (let i = 0; i <= shipLength; i++) {
      let myValue = JSON.stringify([xValue, yValue + i]);
      if (unavailibleString.indexOf(myValue) != -1) {
        return _generateValuesVertical(shipLength);
      }
    }

    for (let i = -1; i < shipLength + 1; i++) {
      unavailibleSquares.push(
        [xValue, yValue + i],
        [xValue + 1, yValue + i],
        [xValue - 1, yValue + i]
      );
    }
    return [xValue, yValue];
  };

  let _generateValuesHorizontal = (shipLength) => {
    let xValue = Math.floor(Math.random() * (10 - shipLength + 1));
    let yValue = Math.floor(Math.random() * 10);
    let unavailibleString = JSON.stringify([unavailibleSquares]);

    for (let i = 0; i <= shipLength; i++) {
      let myValue = JSON.stringify([xValue + i, yValue]);
      if (unavailibleString.indexOf(myValue) != -1) {
        return _generateValuesHorizontal(shipLength);
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
