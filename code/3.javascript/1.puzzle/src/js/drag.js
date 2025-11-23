import { handleUI, resetUI } from "./ui.js";
import {
  checkWin,
  getNameImg,
  getStorage,
  removeStorage,
  setStorage,
} from "./utils.js";

let currTile;
let otherTile;

const dragStart = (e) => {
  currTile = e.target;
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragEnter = () => {};
const dragLeave = () => {};
const dragDrop = (e) => {
  otherTile = e.target;
};
const dragEnd = () => {
  // take coordinate row and col
  const currCoords = currTile.id.split("-");
  const r = Number(currCoords[0]);
  const c = Number(currCoords[1]);
  const otherCoords = otherTile.id.split("-");
  const r1 = Number(otherCoords[0]);
  const c1 = Number(otherCoords[1]);
  const moveHorizontal = r === r1 && (c === c1 + 1 || c === c1 - 1);
  const moveVertical = c === c1 && (r === r1 + 1 || r === r1 - 1);
  const isAdjacent = moveHorizontal || moveVertical;
  if (!isAdjacent) return;

  // change image
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  // save position into local storage
  const imgOrder = getStorage("imgOrder");
  const index = imgOrder.findIndex((el) => {
    return el.id === `${r}-${c}`;
  });
  const index1 = imgOrder.findIndex((el) => {
    return el.id === `${r1}-${c1}`;
  });
  imgOrder[index].name = getNameImg(currTile.src);
  imgOrder[index1].name = getNameImg(otherTile.src);
  setStorage("imgOrder", imgOrder);

  // win alert
  const isWin = checkWin();
  if (isWin) {
    Swal.fire({
      icon: "success",
      title: "Congratulation !, You Win",
      showCancelButton: true,
      confirmButtonText: "Play Again",
    }).then((result) => {
      if (result.isConfirmed) {
        resetUI();
      }
    });
  }
};
export { dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd };
