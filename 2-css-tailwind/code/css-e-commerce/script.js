let isOpen = false;
const menuTrigger = document.querySelector("#menu-trigger");
const menuItems = document.querySelector("#menu-responsive");

menuTrigger.addEventListener("click", () => {
  if (isOpen) {
    isOpen = false;
    menuItems.style.display = "none";
    menuTrigger.textContent = "reorder";
  } else {
    isOpen = true;
    menuItems.style.display = "block";
    menuTrigger.textContent = "close";
  }
});
