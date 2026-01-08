import {
  alertWinner,
  cancelTimeout,
  getNameImg,
  positions,
  saveStorage,
} from "./utils.js";

let dragEl;
let dropEl;

const dragStart = (e) => {
  cancelTimeout();
  dragEl = e.target;
  e.target.classList.add("dragging");
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragEnter = (e) => {
  if (e.target === dragEl) return;
  e.target.classList.add("entering");
};
const dragLeave = (e) => {
  e.target.classList.remove("entering");
};

const drop = (e) => {
  dropEl = e.target;
  // get newest position
  const dragElp = dragEl.id;
  const dragRow = Number(dragElp.split("-")[0]);
  const dragCol = Number(dragElp.split("-")[1]);
  const dropElp = dropEl.id;
  const dropRow = Number(dropElp.split("-")[0]);
  const dropCol = Number(dropElp.split("-")[1]);
  // preventing illegal movement
  const moveH =
    dragRow === dropRow && (dragCol === dropCol + 1 || dragCol === dropCol - 1);
  const moveV =
    dragCol === dropCol && (dragRow === dropRow + 1 || dragRow === dropRow - 1);
  const adjacent = moveH || moveV;
  if (!adjacent) return;
  // swapping images each other
  let dragEl1 = dragEl.src;
  let dropEl1 = dropEl.src;
  dragEl.src = dropEl1;
  dropEl.src = dragEl1;
  // check is winner
  const positionNow = positions;
  const dragI = positionNow.findIndex((el) => {
    return el.id === dragElp;
  });
  const dropI = positionNow.findIndex((el) => {
    return el.id === dropElp;
  });
  positionNow[dragI].name = getNameImg(dragEl.src);
  positionNow[dropI].name = getNameImg(dropEl.src);
  saveStorage("positionNewest", positionNow);
};
const dragEnd = () => {
  const arrDocs = document.querySelectorAll(".dragging, .entering");
  arrDocs.forEach((el) => {
    el.classList.remove("dragging", "entering");
  });
  // win alert
  alertWinner();
};
export { dragStart, dragOver, dragEnter, dragLeave, drop, dragEnd };
