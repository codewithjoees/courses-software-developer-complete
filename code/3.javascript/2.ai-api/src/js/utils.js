const scrollToBottom = (docs) => {
  docs.scrollTo({
    top: docs.scrollHeight,
    behavior: "smooth",
  });
};
const setStorage = (strorage, arr) => {
  localStorage.setItem(strorage, JSON.stringify(arr));
};
const getStorage = (storage) => {
  const storages = JSON.parse(localStorage.getItem(storage));
  return storages;
};
export { scrollToBottom };
