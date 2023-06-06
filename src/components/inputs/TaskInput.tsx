import classNames from "classnames";
import React from "react";

type TaskInputProps = {
  placeholder: string;
  taskName: string;
  onTaskAdd: (taskName: { code: string }) => void;
  onTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export const TaskInput = ({
  placeholder,
  taskName,
  onTaskAdd,
  onTaskChange,
  disabled,
}: TaskInputProps) => (
  <div className="flex flex-row md:mt-8">
    <input
      disabled={disabled}
      onKeyDown={onTaskAdd}
      value={taskName}
      placeholder={placeholder}
      onChange={onTaskChange}
      type="text"
      className={classNames(
        "text-black",
        "md:pl-2",
        "mb-2",
        "md:w-[50%]",
        "w-full",
        "border-2",
        "rounded-md",
        "border-blue-300"
      )}
    />
  </div>
);
