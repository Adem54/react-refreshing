import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        padding: "1rem",
        backgroundColor: theme === "light" ? "#f0f0f0" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h1>Current theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle theme</button>
    </header>
  );
};

export default Header;
