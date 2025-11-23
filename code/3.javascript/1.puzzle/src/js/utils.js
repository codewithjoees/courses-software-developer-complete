const setStorage = (storage, value) => {
  localStorage.setItem(storage, JSON.stringify(value));
};
const getStorage = (storage) => {
  const storages = localStorage.getItem(storage);
  return JSON.parse(storages);
};
const removeStorage = (storage) => {
  localStorage.removeItem(storage);
};
const getNameImg = (src) => {
  const filename = src.split("/").pop();
  return Number(filename.split(".")[0]);
};
const checkWin = () => {
  const positionWin = JSON.stringify([
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
  const imgOrder = JSON.stringify(getStorage("imgOrder").splice(4, 6));
  return positionWin === imgOrder;
};
export { checkWin, getStorage, setStorage, removeStorage, getNameImg };
