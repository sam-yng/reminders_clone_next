import React from "react";
import cross from "../../public/assets/icons/close.png";
import whiteCross from "../../public/assets/icons/closeWhite.png";
import { useReminders, List } from "../utils/RemindersContext";
import Image from "next/image";

export const TaskList = ({ id, name }: List) => {
  const {
    lists,
    setLists,
    setActiveListId,
    selectedList: activeListId,
    theme,
    setTasks,
    tasks,
  } = useReminders();

  const newListView = () => {
    setActiveListId({ listId: id });
  };

  const deleteList = () => {
    setTasks(tasks.filter((task) => task.id === activeListId));
    setLists(lists.filter((list) => list.id !== id));
    setActiveListId(null);
  };

  return (
    <li key={id} className="flex flex-row justify-between">
      <button type="button" onClick={newListView} className="m-2 text-[18px]">
        {name}
      </button>

      <button type="button" onClick={deleteList}>
        <Image
          alt="cross"
          className="h-3 mr-4 w-3"
          src={theme === true ? cross : whiteCross}
        />
      </button>
    </li>
  );
};
