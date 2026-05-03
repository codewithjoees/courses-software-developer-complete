import getAPI from "./service.js";
import { uiChat, uiChatLoading, uiDummy } from "./ui.js";
import { scrollToBottom } from "./utils.js";

const handleChat = async () => {
  uiDummy();
  return;
  const input = document.querySelector("footer input");
  const text = input.value.trim();
  const btn = document.querySelector("footer button");
  const chatBox = document.querySelector("main");
  if (!text) return;
  input.placeholder = "waiting....";
  btn.classList.add("loading");
  try {
    // show user message
    chatBox.innerHTML += uiChat("user", text);
    // show bot loading bubble
    chatBox.innerHTML += uiChatLoading();
    const loadingBubble = document.querySelector("#bot-loading");
    const answer = await getAPI(text);
    // replace loading bubble with actual message
    loadingBubble.outerHTML = uiChat("bot", answer);
  } catch (err) {
    console.error(err);
    loadingBubble.outerHTML = uiChat("bot", "⚠️ Error: Something went wrong.");
    throw err;
  } finally {
    input.value = "";
    const chatBox1 = document.querySelectorAll("main div");
    const targetScroll = chatBox1[chatBox1.length - 2];
    scrollToBottom(chatBox, targetScroll);
    input.placeholder = "Ask Me Evertyhing....";
    btn.classList.remove("loading");
  }
};
export default handleChat;
