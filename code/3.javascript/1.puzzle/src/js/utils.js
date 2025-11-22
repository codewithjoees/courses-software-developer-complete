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
const moveItem = (arr, fromIndex, toIndex) => {
  const arr1 = [...arr];
  const item = arr1.splice(fromIndex, 1)[0];
  arr1.splice(toIndex, 1, item);
  setStorage("imgOrder", arr1);
  return arr1;
};
const getNameImg = (src) => {
  const filename = src.split("/").pop();
  return Number(filename.split(".")[0]);
};
export { moveItem, getStorage, setStorage, removeStorage, getNameImg };
