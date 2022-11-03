// const gameBoard = require("../src/components/gameBoard.js");
// const shipObj = require("../src/components/shipObj");

// test("If boat is added", () => {
//   let myShip = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip);
//   expect(gameBoard1.getShipsOnBoard().length).toBe(1);
// });

// test("Ship gets hit at a specified location on gameBoard", () => {
//   let myShip = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip, [5, 5]);
//   gameBoard1.recieveAttack([5, 5]);

//   expect(myShip.getHitScore()).toBe(1);
// });

// test("Ship doesn't get hit at a specified location on gameBoard", () => {
//   let myShip = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip, [5, 5]);
//   gameBoard1.recieveAttack([6, 6]);

//   expect(myShip.getHitScore()).toBe(0);
// });

// test("Ship will sunk if hit in all places", () => {
//   let myShip = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip, [5, 5]);
//   gameBoard1.recieveAttack([5, 5]);
//   gameBoard1.recieveAttack([6, 5]);

//   expect(myShip.getHitScore()).toBe("Ship sunked");
// });

// test("If shot at sunked ship, return ship sunked", () => {
//   let myShip = shipObj(2);
//   let myShip1 = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip, [5, 5]);
//   gameBoard1.placeShip(myShip1, [7, 7]);
//   gameBoard1.recieveAttack([5, 5]);
//   gameBoard1.recieveAttack([6, 5]);

//   expect(gameBoard1.recieveAttack([5, 5])).toBe("Ship sunked");
// });

// test("If shot at sunked ship, return ship sunked", () => {
//   let myShip = shipObj(2);
//   let gameBoard1 = gameBoard();
//   gameBoard1.placeShip(myShip, [5, 5]);
//   gameBoard1.recieveAttack([5, 5]);
//   gameBoard1.recieveAttack([6, 5]);

//   expect(gameBoard1.recieveAttack([5, 5])).toBe("Game over");
// });
