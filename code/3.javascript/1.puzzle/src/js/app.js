const rows = 3;
const columns = 3;
let currTile;
let otherTile;
let turns = 0;
const imgOrder = [4, 2, 8, 5, 1, 6, 7, 9, 3];
window.onload = function () {
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= columns; c++) {
      const tile = document.createElement("img");
      tile.id = `${r}-${c}`;
      tile.src = `./src/img/${imgOrder.shift()}.png`;

      // drag functionallity
      // 1.click an image to drag
      tile.addEventListener("dragstart", dragStart);
      // 2.moving image around while clicked
      tile.addEventListener("dragover", dragOver);
      // 3.dragging image onto another me
      tile.addEventListener("dragenter", dragEnter);
      // 4.dragged image leave another image
      tile.addEventListener("dragleave", dragLeave);
      // 5.drag an image over another image, drop the image
      tile.addEventListener("drop", dragDrop);
      // 6.after drag drop ,swap 2 tiles
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }
};
function dragStart(e) {
  currTile = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter() {}
function dragLeave() {}
function dragDrop() {
  otherTile = this;
}
function dragEnd() {
  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);
  let otherCoords = otherTile.id.split("-");
  let r1 = parseInt(otherCoords[0]);
  let c1 = parseInt(otherCoords[1]);

  let moveLeft = r === r1 && c1 === c - 1;
  let moveRight = r === r1 && c1 === c + 1;
  let moveUp = c === c1 && r1 === r - 1;
  let moveDown = c === c1 && r1 === r + 1;
  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
  }
}
