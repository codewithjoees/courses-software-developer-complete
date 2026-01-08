import {
  dragEnd,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
  drop,
} from "./drag.js";
import { getPositions, positions, removeStorage } from "./utils.js";

const uiBoard = (position) => {
  for (const el of position) {
    const img = document.createElement("img");
    img.id = el.id;
    img.src = `./src/img/${el.name}.png`;
    img.addEventListener("dragstart", dragStart);
    img.addEventListener("dragover", dragOver);
    img.addEventListener("dragenter", dragEnter);
    img.addEventListener("dragleave", dragLeave);
    img.addEventListener("drop", drop);
    img.addEventListener("dragend", dragEnd);
    document.querySelector(".board").append(img);
  }
};
const uiReset = () => {
  removeStorage("positionNewest");
  document.querySelector(".board").innerHTML = "";
  uiBoard(getPositions());
};
export { uiReset, uiBoard };
