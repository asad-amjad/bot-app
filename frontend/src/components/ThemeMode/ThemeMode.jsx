import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Tooltip from "../Tooltip/Tooltip";

const IS_SERVER = typeof window === "undefined";

let storedTheme = IS_SERVER ? "light" : localStorage.getItem("theme");

// const arrayOfThemes = [
//   { name: "Light", icon: <FiSun /> },
//   { name: "Dark", icon: <FiMoon /> },
// ];

function modifyDOM(theme) {
  if (
    theme === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }
}

export default function ThemeMode() {
  const [mode, setMode] = useState(getPreferredTheme());

  useEffect(() => {
    if (IS_SERVER) return;
    modifyDOM(mode);
  }, [mode]);

  function getPreferredTheme() {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setPreferredTheme(theme) {
    modifyDOM(theme);
    localStorage.setItem("theme", theme);
    setMode(theme);
  }

  const toggleTheme = () => {
    const newTheme = mode === "dark" ? "light" : "dark";
    setPreferredTheme(newTheme);
  };

  return (
    <div
      className="form-check form-switch"
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <Tooltip content="Theme mode" place="bottom">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={mode === "dark"}
        onChange={toggleTheme}
        style={{
          cursor: "pointer",
          width: "45px",
          height: "2px",
          position: "relative",
          background: "gray",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
      />
      <label
        className="form-check-label"
        htmlFor="themeSwitch"
        style={{
          position: "absolute",
          top: "1px",
          left: mode === "dark" ? "26px" : "2px",
          width: "25px",
          height: "25px",
          transition: "left 0.3s",
          pointerEvents: "none",
          background: "#000",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        {mode === "dark" ? (
          <FiMoon style={{ fontSize: "15px", color: "#fff" }} />
        ) : (
          <FiSun style={{ fontSize: "15px", color: "#fff" }} />
        )}
      </label>
        </Tooltip>
    </div>
  );
}
