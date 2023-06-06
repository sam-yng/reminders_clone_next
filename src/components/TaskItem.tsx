/* eslint-disable indent */
import React, { useCallback, useState } from "react";
import { useReminders, Task } from "../utils/RemindersContext";
import check from "../../public/assets/icons/checkmark.png";
import flag from "../../public/assets/icons/image.png";
import { DateInput } from "./inputs/DateInput";
import calendar from "../../public/assets/icons/calendar-two.png";

export const TaskItem = ({ id, name, flagged, listId }: Task) => {
  const { setTasks, tasks } = useReminders();
  const [inputDate, setInputDate] = useState<string>("");

  const onClickRemove = useCallback(() => {
    setTasks(tasks.filter((task) => task.id !== id));
  }, [id, setTasks, tasks]);

  const onClickFlagTask = useCallback(() => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              flagged: !flagged,
            }
          : task
      )
    );
  }, [flagged, id, setTasks, tasks]);

  const handleDateUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(event.target.value);
  };

  const handleDate = (e: { code: string }) => {
    if (e.code === "Enter" && inputDate.length === 10) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, date: inputDate } : task
        )
      );
    }
  };

  return (
    <div className="md:ml-6 mt-6 md:w-[46%] flex flex-row">
      <button
        type="button"
        onClick={onClickRemove}
        className="cursor-pointer hover:line-through text-[18px] md:text-[22px]"
      >
        <li key={listId}>{name}</li>
      </button>
      <DateInput
        inputDate={inputDate}
        placeholder="Add Date"
        icon={calendar.src}
        handleDate={handleDate}
        handleUpdate={handleDateUpdate}
      />
      <button
        onClick={onClickFlagTask}
        type="button"
        className="p-2 rounded-lg border-2 bg-slate-100 border-slate-100"
      >
        <img
          alt="flag"
          className="h-5"
          src={flagged === true ? check.src : flag.src}
        />
      </button>
    </div>
  );
};
