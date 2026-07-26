import React, { useState } from "react";
import { useContexts } from "../contexts/context";
import { FaCheck, FaTrash } from "react-icons/fa";

const List = () => {
  const { list, setList } = useContexts();
  const [dragStart, setDragStart] = useState(null);
  const [dragOver, setDragOVer] = useState(null);
  const [drop, setDrop] = useState(null);
  const handleDone = (el) => {
    setList((prev) =>
      prev.map((e) =>
        e.id === el.id ? { ...e, statusDone: !e.statusDone } : e,
      ),
    );
  };
  const handleDelete = (el) => {
    setList((prev) => prev.filter((e) => e.id !== el.id));
  };
  const handleDragStart = (el) => {
    setDragStart(el);
  };
  const handleDragEnter = () => {};
  const handleDragOver = (ev, el) => {
    ev.preventDefault();
    if (dragStart === dragOver) return;
    setDragOVer(el);
  };
  const handleDragLeave = () => {
    setDragOVer(null);
  };
  const handleDrop = (el) => {
    setDrop(el);
  };
  const handleDragEnd = () => {
    const dragStartItem = list.find((el) => el.id === dragStart?.id);
    const dropItem = list.find((el) => el.id === drop?.id);
    if (!dragStartItem || !dropItem) return;
    setList((prev) =>
      prev.map((el) => {
        if (el.id === dragStartItem.id) {
          return {
            ...el,
            name: drop.name,
            statusDone: drop.statusDone,
          };
        }
        if (el.id === dropItem.id) {
          return {
            ...el,
            name: dragStart.name,
            statusDone: dragStart.statusDone,
          };
        }
        return el;
      }),
    );
  };
  return (
    <>
      {list.map((el) => (
        <div className="flex items-center">
          <div
            className={`w-full p-3 capitalize ${el.statusDone && "line-through"} flex gap-2 items-center ${dragOver === el ? "border-dashed border-2" : "border-b-2 border-b-slate-300"}`}
            draggable={true}
            onClick={() => handleDone(el)}
            onDragStart={() => handleDragStart(el)}
            onDragEnter={() => handleDragEnter()}
            onDragOver={(ev) => handleDragOver(ev, el)}
            onDragLeave={() => handleDragLeave()}
            onDrop={() => handleDrop(el)}
            onDragEnd={() => handleDragEnd()}
          >
            {el.name} {el.statusDone && <FaCheck />}
          </div>
          <div
            className="opacity-0 hover:opacity-100"
            onClick={() => handleDelete(el)}
          >
            <FaTrash />
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
