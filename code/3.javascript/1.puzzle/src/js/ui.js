import {
  dragDrop,
  dragEnd,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
} from "./drag.js";
import { getStorage, setStorage } from "./utils.js";

const handleUI = () => {
  const imgOrder = getStorage("imgOrder");
  if (!imgOrder) {
    setStorage("imgOrder", [
      {
        id: "1-1",
        name: 1,
      },
      {
        id: "1-2",
        name: 2,
      },
      {
        id: "1-3",
        name: 3,
      },
      { id: "2-1", name: 4 },
      {
        id: "2-2",
        name: 5,
      },
      {
        id: "2-3",
        name: 6,
      },
      {
        id: "3-1",
        name: 7,
      },
      {
        id: "3-2",
        name: 8,
      },
      {
        id: "3-3",
        name: 9,
      },
    ]);
  }
  for (const el of imgOrder) {
    const tile = document.createElement("img");
    tile.id = `${el.id}`;
    tile.src = `./src/img/${el.name}.png`;
    // drag functionallity
    // 1.click an image to drag
    tile.addEventListener("dragstart", dragStart);
    // 2.moving image around while clicked
    tile.addEventListener("dragover", dragOver);
    // 3.dragging image onto another component
    tile.addEventListener("dragenter", dragEnter);
    // 4.dragged image leave another image
    tile.addEventListener("dragleave", dragLeave);
    // 5.drag an image over another image, drop the image
    tile.addEventListener("drop", dragDrop);
    // 6.after drag drop ,swap 2 tiles
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("board").append(tile);
  }
};
export default handleUI;
