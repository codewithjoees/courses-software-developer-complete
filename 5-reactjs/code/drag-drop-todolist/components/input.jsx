import React from "react";
import { useContexts } from "../contexts/context";

const Input = () => {
  const { setValue, handleAdd, value } = useContexts();
  return (
    <div className="w-[90%]">
      <input
        type="text"
        placeholder="what are you gonna do ?"
        className="w-full p-2 focus:outline-0 focus:border-2 focus:border-blue-300 bg-blue-100"
        onChange={(el) => setValue(el.target.value)}
        onKeyDown={(el) => {
          if (el.key === "Enter") {
            handleAdd();
          }
        }}
        value={value}
      />
    </div>
  );
};

export default Input;
