let shipLength = 2;

let keepTrackOfVals = [
  { xValue: 5, yValue: 5 },
  { xValue: 6, yValue: 5 },
];

function randomNum() {
  let yValue = Math.floor(Math.random() * 10);
  let xValue = Math.floor(Math.random() * (10 - shipLength));
}

// for (let i = 0; i < 100; i++) {
//   if (randomNum()[1] == 5) {
//     console.log(true);
//   }
// }
let availible = [];
for (let x = 0; x < 3; x++) {
  for (let y = 0; y < 3; y++) {
    availible.push([x, y]);
  }
}

let unavailibleSquares = [];

function unavailibleVals(val, shipLength) {
  let myValue = availible[val];
  for (let i = -1; i < shipLength; i++) {
    unavailibleSquares.push(
      [myValue[0] + i, myValue[1]],
      [myValue[0] + i, myValue[1] + 1],
      [myValue[0] + i, myValue[1] - 1]
    );
  }
}
console.log(availible[5]);
unavailibleVals(5, 2);

console.log(unavailibleSquares);

let myArr = [
  [0, 2],
  [0, 3],
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 1],
  [2, 2],
  [2, 3],
  [2, 1],
];

let myValue = [1, 1];

let a = JSON.stringify(myArr);
let b = JSON.stringify([2, 1+2]);

console.log(a.indexOf(b));
