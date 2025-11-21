import getAPI from "./service.js";
import { chat, chatLoading } from "./ui.js";
import { scrollToBottom } from "./utils.js";

const handleChat = async () => {
  const btn = document.querySelector("footer button");
  const chatBox = document.querySelector("main");
  const input = document.querySelector("footer input");
  const text = input.value.trim();
  if (!text) return;
  input.placeholder = "waiting....";
  btn.classList.add("loading");
  try {
    // show user message
    chatBox.innerHTML += chat("user", text);
    // show bot loading bubble
    chatBox.innerHTML += chatLoading();
    const loadingBubble = document.querySelector("#bot-loading");
    const answer = await getAPI(text);
    // replace loading bubble with actual message
    loadingBubble.outerHTML = chat("bot", answer);
  } catch (err) {
    loadingBubble.outerHTML = chat("bot", "⚠️ Error: Something went wrong.");
    console.error(err);
    throw err;
  } finally {
    input.value = "";
    scrollToBottom(chatBox);
    input.placeholder = "Ask Me Evertyhing....";
    btn.classList.remove("loading");
  }
};
export default handleChat;
