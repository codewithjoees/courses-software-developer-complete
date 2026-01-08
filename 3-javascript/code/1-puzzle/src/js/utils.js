import { uiReset } from "./ui.js";

const positionWin = [
  { id: "1-1", name: 1 },
  { id: "1-2", name: 2 },
  { id: "1-3", name: 3 },
  { id: "2-1", name: 4 },
  { id: "2-2", name: 5 },
  { id: "2-3", name: 6 },
  { id: "3-1", name: 7 },
  { id: "3-2", name: 8 },
  { id: "3-3", name: 9 },
];
const getNameImg = (src) => {
  const sources = src.split("/").pop();
  const nameImg = Number(sources.split(".")[0]);
  return nameImg;
};
const saveStorage = (storage, value) => {
  localStorage.setItem(storage, JSON.stringify(value));
};
const getStorage = (storage) => {
  const storages = JSON.parse(localStorage.getItem(storage));
  return storages;
};
const removeStorage = (item) => {
  localStorage.removeItem(item);
};
const defaultPositions = [
  { id: "1-1", name: 1 },
  { id: "1-2", name: 2 },
  { id: "1-3", name: 3 },
  { id: "2-1", name: 6 },
  { id: "2-2", name: 5 },
  { id: "2-3", name: 4 },
  { id: "3-1", name: 9 },
  { id: "3-2", name: 8 },
  { id: "3-3", name: 7 },
];
const getPositions = () => {
  return getStorage("positionNewest") || defaultPositions;
};
const positions = getStorage("positionNewest") || [
  { id: "1-1", name: 1 },
  { id: "1-2", name: 2 },
  { id: "1-3", name: 3 },
  { id: "2-1", name: 6 },
  { id: "2-2", name: 5 },
  { id: "2-3", name: 4 },
  { id: "3-1", name: 9 },
  { id: "3-2", name: 8 },
  { id: "3-3", name: 7 },
];
let winTimeout = null;
const cancelTimeout = () => {
  if (winTimeout) {
    clearTimeout(winTimeout);
    winTimeout = null;
  }
};
const alertWinner = () => {
  const now = getStorage("positionNewest").slice(4);
  const win = positionWin.slice(4);
  const isWin = JSON.stringify(now) === JSON.stringify(win);
  if (!isWin) return;
  if (winTimeout) return;
  winTimeout = setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "You Win",
      showCancelButton: true,
      confirmButtonText: "Play Again",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        uiReset();
      }
    });
  }, 3000);
};
export {
  alertWinner,
  cancelTimeout,
  positions,
  positionWin,
  getPositions,
  getNameImg,
  saveStorage,
  getStorage,
  removeStorage,
};
