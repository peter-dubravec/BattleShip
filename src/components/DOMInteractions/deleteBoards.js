function deleteBoards(isComputer) {
  if (isComputer) {
    let computerBoard = document.querySelector(".gameBoardcomputer");
    computerBoard.remove();
  } else {
    let playerBoard = document.querySelector(".gameBoardplayer");
    playerBoard.remove();
  }
}

module.exports = deleteBoards;
