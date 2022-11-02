function gameOver(isComputer) {
  let winnerp = document.createElement("p");
  winnerp.className = "winner";
  if (isComputer) {
    winnerp.textContent = "Congratulations! You won!";
  } else {
    winnerp.textContent = "Enemy won!";
  }
  let restartBtn = document.querySelector(".buttonrestart");
  restartBtn.style.display = "block";

  let main = document.querySelector("main");
  main.append(winnerp);
  let computerDivs = Array.from(document.querySelectorAll(".divRowcomputer"));
  computerDivs.forEach((div) => {
    div.classList.remove("divRowcomputer");
    div.classList.add("divRow-nohover");
  });
}

module.exports = gameOver;
