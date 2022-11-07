const shipObj = require("../src/components/Objects/shipObj.js");

describe("Testing ship object", () => {
  test("Return length of ship", () => {
    let myShip = shipObj(9);
    expect(myShip.length).toBe(9);
  });

  test("Ship that was hit at every availible point is sunked", () => {
    let myShip = shipObj(2);
    myShip.hit();
    expect(myShip.hit()).toBe("Ship sunked");
  });
});
