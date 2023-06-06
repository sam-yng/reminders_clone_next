"use client";

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export enum ListState {
  Active = "active",
  Deleted = "deleted",
}

export type Task = {
  id: string;
  name: string;
  complete?: boolean;
  flagged: boolean;
  date?: string;
  listId: string | null;
};

export type List = {
  id: string;
  name: string;
};

export type SelectedListId = { listId: string };

export type SelectedList =
  | "today"
  | "scheduled"
  | "flagged"
  | "all"
  | SelectedListId
  | null;

export const doesSelectedListHaveAnId = (
  list: SelectedList
): list is SelectedListId =>
  (list as SelectedListId | null)?.listId !== undefined;

export type RemindersContextType = {
  lists: List[];
  selectedList: SelectedList;

  tasks: Task[];
  setTasks: (task: Task[]) => void;

  setLists: (lists: List[]) => void;
  setActiveListId: (listId: SelectedList) => void;

  theme: boolean;
  setTheme: (theme: boolean) => void;
};

const RemindersContext = createContext<RemindersContextType | undefined>(
  undefined
);

export const RemindersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setActiveListId] = useState<SelectedList>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<boolean>(true);

  useEffect(() => {
    const data = localStorage.getItem("LISTS");
    if (data !== null) setLists(JSON.parse(data));
    const taskData = localStorage.getItem("TASKS");
    if (taskData !== null) setTasks(JSON.parse(taskData));
    const themeData = localStorage.getItem("THEME");
    if (themeData !== null) setTheme(JSON.parse(themeData));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("LISTS", JSON.stringify(lists));
    });
  }, [lists]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("TASKS", JSON.stringify(tasks));
    });
  }, [tasks]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("THEME", JSON.stringify(theme));
    });
  }, [theme]);

  const value = useMemo(
    (): RemindersContextType => ({
      lists,
      selectedList,
      setLists,
      setActiveListId,
      tasks,
      setTasks,
      theme,
      setTheme,
    }),
    [selectedList, lists, tasks, theme]
  );

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = (): RemindersContextType => {
  const value = useContext(RemindersContext);
  if (!value) {
    throw new Error(
      "useReminders can only be called from within a RemindersProvider"
    );
  }
  return value;
};
