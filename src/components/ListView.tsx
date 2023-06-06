import React, { useMemo } from "react";
import { format, isToday } from "date-fns";
import parse from "date-fns/parse";
import { useReminders } from "../utils/RemindersContext";

type ListViewProps = {
  icon: string;
  type: "today" | "scheduled" | "flagged" | "all";
};

export const ListView: React.FC<ListViewProps> = ({ icon, type }) => {
  const { tasks, setActiveListId } = useReminders();

  const name = useMemo(() => {
    switch (type) {
      case "today":
        return "Today";
      case "scheduled":
        return "Scheduled";
      case "flagged":
        return "Flagged";
      case "all":
        return "All";
      default:
        throw new Error("type can only be 1 of 4");
    }
  }, [type]);

  const count = useMemo(() => {
    let num = 0;

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const date = task.date
        ? parse(task.date, "dd/MM/yyyy", new Date())
        : null;

      switch (type) {
        case "today": {
          if (!date) {
            break;
          }
          const input = format(date, "dd/MM/yyyy");
          const newDate = new Date(input);
          num = isToday(newDate) ? num + 1 : num;
          break;
        }
        case "scheduled":
          num = date ? num + 1 : num;
          break;
        case "flagged":
          num = task.flagged ? num + 1 : num;
          break;
        case "all":
          num += 1;
          break;
        default:
          throw new Error("type can only be 1 of 4");
      }
    }
    return num;
  }, [tasks, type]);

  return (
    <button
      type="button"
      className="border-2 bg-slate-100 border-slate-100 m-3 p-2 rounded-lg"
      onClick={() => setActiveListId(type)}
    >
      <div className="flex flex-row justify-between">
        <img className="h-8" alt="icon" src={icon} />
        <h1 className="text-[22px] text-black">{count}</h1>
      </div>
      <h1 className="pt-2 text-left text-[18px] text-black">{name}</h1>
    </button>
  );
};
