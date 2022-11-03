const shipObj = require("../src/components/Objects/shipObj.js");

test("Ship that was hit at every availible point is sunked", () => {
  let myShip = shipObj(2);
  myShip.hit();
  expect(myShip.hit()).toBe("Ship sunked");
});
