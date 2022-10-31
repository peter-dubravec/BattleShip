const shipObj = require("../src/components/shipObj");

test("If ship is hit, increase hit score", () => {
  let myShip = shipObj();
  myShip.hit();
  expect(myShip.getHitScore()).toBe(1);
});

test("Test if ship will sink", () => {
  let myShip = shipObj(2);
  myShip.hit();
  myShip.hit();
  expect(myShip.hit()).toBe("Ship sunked");
});
