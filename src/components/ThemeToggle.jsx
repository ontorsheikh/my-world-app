import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function toggle() {
    setDark((value) => !value);
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
