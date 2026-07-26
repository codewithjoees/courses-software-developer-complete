import React from "react";
import { IoSend } from "react-icons/io5";
import { useContexts } from "../contexts/context";

const Button = () => {
  const { setList, list, handleAdd } = useContexts();
  return (
    <div className="w-[10%] flex bg-blue-500" onClick={handleAdd}>
      <button className="m-auto">
        <IoSend className="text-white" />
      </button>
    </div>
  );
};

export default Button;
