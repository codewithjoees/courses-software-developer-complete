import { createContext, useContext, useState } from "react";

const Contexts = createContext();
const ContextProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const handleAdd = () => {
    if (value === "") return;
    setList((prev) => [
      ...prev,
      { id: list.length + 1, name: value, statusDone: false },
    ]);
    setValue("");
  };
  const values = {
    value,
    setValue,
    list,
    setList,
    handleAdd,
  };
  return <Contexts value={values}>{children}</Contexts>;
};
const useContexts = () => {
  const contexts = useContext(Contexts);
  return contexts;
};
export { ContextProvider, useContexts };
