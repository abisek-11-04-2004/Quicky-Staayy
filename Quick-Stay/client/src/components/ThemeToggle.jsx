import React from "react";

const ThemeToggle = ({ theme, switchTheme }) => {
  return (
    <button
      onClick={switchTheme}
      className="text-2xl transition-transform hover:scale-110"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  );
};

export default ThemeToggle;
