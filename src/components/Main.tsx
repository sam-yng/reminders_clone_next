"use client";

import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import {
  doesSelectedListHaveAnId,
  useReminders,
} from "../utils/RemindersContext";
// import "react-calendar/dist/Calendar.css";
import arrow from "../../public/assets/icons/right-arrow.png";
import { TaskItem } from "./TaskItem";
import { TaskInput } from "./inputs/TaskInput";
import Image from "next/image";

export const Main = () => {
  const { setActiveListId, setTasks, tasks, selectedList, lists, theme } =
    useReminders();
  const [input, setInput] = useState<string>("");

  const tasksByList = useMemo(() => {
    switch (selectedList) {
      case "today":
        return tasks
          .filter((task) => task.date === format(new Date(), "dd/MM/yyyy"))
          .map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              name={item.name}
              flagged={item.flagged}
              listId={selectedList}
            />
          ));
      case "scheduled":
        return tasks
          .filter((task) => task.date)
          .map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              name={item.name}
              flagged={item.flagged}
              listId={selectedList}
            />
          ));
      case "flagged":
        return tasks
          .filter((task) => task.flagged === true)
          .map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              name={item.name}
              flagged={item.flagged}
              listId={selectedList}
            />
          ));
      case "all":
        return tasks.map((item) => (
          <TaskItem
            key={item.id}
            id={item.id}
            name={item.name}
            flagged={item.flagged}
            listId={selectedList}
          />
        ));
      case null:
        return [];
      default:
        return tasks
          .filter((task) => task.listId === selectedList.listId)
          .map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              name={item.name}
              flagged={item.flagged}
              listId={selectedList?.listId}
            />
          ));
    }
  }, [selectedList, tasks]);

  const listName = useMemo(() => {
    switch (selectedList) {
      case "today":
        return "Today";
      case "scheduled":
        return "Scheduled";
      case "flagged":
        return "Flagged";
      case "all":
        return "All";
      default:
        return lists.find((list) => list.id === selectedList?.listId)?.name;
    }
  }, [selectedList, lists]);

  const inputStatus = useMemo(() => {
    switch (selectedList) {
      case "today":
        return true;
      case "scheduled":
        return true;
      case "flagged":
        return true;
      case "all":
        return true;
      default:
        return false;
    }
  }, [selectedList]);

  const handleBack = (e: { code: string }) => {
    if (e.code === "Escape") {
      setActiveListId(null);
    }
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleTaskAdd = (e: { code: string }) => {
    if (e.code === "Enter" && selectedList) {
      tasks.splice(0, 0, {
        id: uuidv4(),
        name: input,
        flagged: false,
        listId: doesSelectedListHaveAnId(selectedList)
          ? selectedList.listId
          : null,
      });
      setTasks(tasks.filter((task) => task.id));
      setInput("");
    }
  };

  if (!selectedList) {
    return (
      <div
        className={`w-[75%] pl-16 pt-8 md:visible ${theme ? "light" : "dark"}`}
      />
    );
  }

  return (
    <div className={`w-[75%] ${theme ? "light" : "dark"}`}>
      <main className={`m-auto md:ml-16 md:mt-8 ${theme ? "light" : "dark"}`}>
        <button
          type="button"
          onClick={() => setActiveListId(null)}
          onKeyDown={handleBack}
        >
          <Image
            alt="arrow"
            src={arrow}
            className="md:hidden block h-6 rotate-180 mt-4"
          />
        </button>
        <article className="flex flex-row mt-4">
          <h1 className="md:text-[40px] text-[25px] mb-4">{listName}</h1>
          <h1 className="md:text-[40px] text-[20px] ml-auto mr-16">
            {tasksByList.length}
          </h1>
        </article>
        <TaskInput
          placeholder=""
          taskName={input}
          onTaskAdd={handleTaskAdd}
          onTaskChange={handleTaskChange}
          disabled={inputStatus}
        />
        <div>
          <ul>{tasksByList}</ul>
        </div>
      </main>
    </div>
  );
};
