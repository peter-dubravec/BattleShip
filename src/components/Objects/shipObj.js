function ShipObj(length) {
  let hitScore = 0;

  let _shipSink = () => "Ship sunked";

  let hit = () => {
    hitScore = hitScore + 1;

    if (hitScore >= length) {
      return _shipSink();
    }
  };

  return { hit, length };
}

module.exports = ShipObj;
