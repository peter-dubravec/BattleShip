require("./style.css");
const PlayerObj = require("./components/Objects/PlayerObj.js");

let player = PlayerObj(false);
let computer = PlayerObj(true);
let randombtn = document.querySelector(".randombtn");
randombtn.addEventListener("click", () => player.gameBoard.randomize());

function gameLoop() {
  let computerDivs = Array.from(document.querySelectorAll(".divRowcomputer"));

  function attackComputer(e) {
    if (player.gameBoard.checkGameEnd() || computer.gameBoard.checkGameEnd()) {
      return;
    }

    randombtn.style.display = "none";
    let coordinates = e.target.dataset.coordinates
      .split(",")
      .map((val) => parseInt(val));
    player.attack(computer, coordinates);

    if (player.gameBoard.checkGameEnd() || computer.gameBoard.checkGameEnd()) {
      return;
    }

    setTimeout(() => {
      computer.attack(player);
    }, "150");
  }
  randombtn.style.display = "block";
  computerDivs.forEach((div) =>
    div.addEventListener("click", attackComputer, { once: true })
  );
}

gameLoop();

let restartButton = document.querySelector(".buttonrestart");
restartButton.addEventListener("click", () => {
  player.gameBoard.restart();
  computer.gameBoard.restart();
  restartButton.style.display = "none";
  gameLoop();
});
