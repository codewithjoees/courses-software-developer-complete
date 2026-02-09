import handleChat from "./handle-api.js";
import { uiDummy } from "./ui.js";

const btn = document.querySelector("footer button");
btn.addEventListener("click", handleChat);
