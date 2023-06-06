import React from "react";
import darkSlider from "../../public/assets/icons/dark.png";
import lightSlider from "../../public/assets/icons/light.png";
import { useReminders } from "../utils/RemindersContext";
import Image from "next/image";

export const ThemeButton = () => {
  const { theme, setTheme } = useReminders();

  return (
    <div className="flex justify-end mr-4">
      <button className="h-14" onClick={() => setTheme(!theme)} type="button">
        <Image
          alt="Theme button"
          src={theme === true ? darkSlider : lightSlider}
          className="h-10 w-auto"
        />
      </button>
    </div>
  );
};
