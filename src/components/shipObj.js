function shipObj(length) {
  let hitScore = 0;

  let _shipSink = () => "Ship sunked";

  let getHitScore = () => {
    if (hitScore >= length) {
      return _shipSink();
    }

    return hitScore;
  };
  let hit = () => {
    hitScore = hitScore + 1;

    if (hitScore >= length) {
      return _shipSink();
    }
  };

  return { hit, getHitScore, length };
}

module.exports = shipObj;
