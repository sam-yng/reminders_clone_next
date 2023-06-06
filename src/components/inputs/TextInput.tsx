import React, { KeyboardEvent } from "react";

type TextInputProps = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
};

export const TextInput = ({
  placeholder,
  value,
  onEnter,
  onChange,
}: TextInputProps) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      onEnter?.();
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="mt-5 flex flex-row">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        className="text-black w-[95%] flex m-auto pl-4 border-2 rounded-md"
      />
    </div>
  );
};
