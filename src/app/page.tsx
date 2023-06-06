"use client";

import React from "react";
import { SideNav } from "../components/SideNav";
import { Main } from "../components/Main";
import { useReminders } from "../utils/RemindersContext";

export default function Home() {
  const { theme } = useReminders();

  return (
    <div className={theme ? "light" : "dark"}>
      <main className="md:flex h-[100vh] md:flex-row">
        <SideNav />
        <Main />
      </main>
    </div>
  );
}
