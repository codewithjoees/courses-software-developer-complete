const uiChat = (role, txt) => {
  return `
    <div
      class="mb-4 max-w-[75%] w-fit ${
        role === "user"
          ? "bg-[#0029A6] text-white ml-auto rounded-br-none"
          : "bg-blue-100 rounded-bl-none"
      } p-3 rounded-2xl"
    >
      ${txt}
    </div>
  `;
};

const uiChatLoading = () => {
  return `
    <div id="bot-loading"
      class="mb-4 max-w-[75%] w-fit bg-blue-100 rounded-bl-none p-3 rounded-2xl"
    >
      Thinking in secs...
    </div>
  `;
};
const uiDummy = () => {
  const chatBox = document.querySelector("main");
  const txt = `USER Lorem ipsum`;
  const txt1 = `BOT Lorem ipsum, dolor sit impedit illo esse consequatur totam consectetur vel non beatae cupiditate quidem animi!`;
  chatBox.innerHTML += uiChat("user", txt);
  chatBox.innerHTML += uiChat("bot", txt1);
};
export { uiChat, uiChatLoading, uiDummy };
