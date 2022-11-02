function renderMissedShot(belongsTo, coordinates) {
  let square = document.querySelector(
    `.divRow${belongsTo}[data-coordinates="${coordinates}"]`
  );
  square.classList.add("missedshot");
}

function renderHit(belongsTo, coordinates) {
  let square = document.querySelector(
    `.divRow${belongsTo}[data-coordinates="${coordinates}"]`
  );
  square.classList.add("hit");
}

module.exports = { renderMissedShot, renderHit };
