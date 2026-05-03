import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FaSearch } from "react-icons/fa";

type InputSearchProps<T> = {
  req: T;
  setReq: Dispatch<SetStateAction<T>>;
  getApi: (req: T) => Promise<void>;
};

const InputSearch = <T extends object>(props: InputSearchProps<T>) => {
  const { req, setReq, getApi } = props;
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };
  const handleSearch = async () => {
    const newReq = { ...req, search };
    setReq(newReq);
    await getApi(newReq);
  };
  return (
    <div className="h-[40px] flex">
      <input
        type="text"
        className="border border-slate-300 p-2 ps-2 w-[450px]  focus:border-blue-500 focus:border-2 focus:outline-none"
        placeholder="input the keyword...."
        onChange={handleChange}
        value={search}
      />
      <button
        className="bg-blue-500 text-white w-[45px] flex rounded-e-lg hover:cursor-pointer"
        onClick={() => handleSearch()}
      >
        <FaSearch className="m-auto" />
      </button>
    </div>
  );
};

export default InputSearch;
