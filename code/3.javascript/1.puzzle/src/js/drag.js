import handleUI from "./ui.js";
import { getStorage, moveItem, setStorage } from "./utils.js";

let currTile;
let otherTile;

const imgOrder = getStorage("imgOrder");

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
    // save position
    const arr1 = [...imgOrder];
    console.log("Start Position");
    console.log(`src : ${currTile.src} , position : ${currTile.id}`);
    // console.log("End Position");
    // console.log(`src : ${otherTile.src} , position : ${otherTile.id}`);
    // setStorage("imgOrder", arr1);

    // change image
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    // win alert coming soon
  }
};
export { dragStart, dragOver, dragEnter, dragLeave, dragDrop, dragEnd };
