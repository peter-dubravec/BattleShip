let shipsOnBoard = [
  { ship: { length: 1 }, coordinates: [[1, 7]] },
  {
    ship: { length: 2 },
    coordinates: [
      [0, 5],
      [1, 5],
    ],
  },
];

for (let obj of shipsOnBoard) {
  for (let arr of obj.coordinates) {
    console.log(arr);
  }
}
