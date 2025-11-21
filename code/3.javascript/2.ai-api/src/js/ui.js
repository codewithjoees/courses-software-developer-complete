const chat = (role, txt) => {
  return `
    <div
      class="mb-4 ${
        role === "user"
          ? "bg-[#0029A6] text-white ml-auto rounded-br-none"
          : "bg-blue-100 rounded-bl-none"
      } p-3 rounded-2xl w-[75%]"
    >
      ${txt}
    </div>
  `;
};

const chatLoading = () => {
  return `
    <div id="bot-loading"
      class="mb-4 bg-blue-100 rounded-bl-none p-3 rounded-2xl w-[75%] animate-pulse"
    >
      Thinking in secs...
    </div>
  `;
};

export { chat, chatLoading };
