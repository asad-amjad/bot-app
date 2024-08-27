import { useState, useEffect } from 'react';
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";


const IS_SERVER = typeof window === 'undefined';

let storedTheme = IS_SERVER ? 'light' : localStorage.getItem('theme');

const arrayOfThemes = [
  { name: 'Light', icon: <FiMoon/> },
  { name: 'Dark', icon: <FiSun/> },
//   { name: 'Auto', icon: '⚙️' },
];

// Modifies the html root element
function modifyDOM(theme) {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
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

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function setPreferredTheme(theme) {
    modifyDOM(theme);
    localStorage.setItem('theme', theme);
    setMode(theme);
  }

  function toggleTheme() {
    const currentIndex = arrayOfThemes.findIndex(
      (theme) => theme.name.toLowerCase() === mode
    );
    const nextIndex = (currentIndex + 1) % arrayOfThemes.length;
    const nextTheme = arrayOfThemes[nextIndex].name.toLowerCase();
    setPreferredTheme(nextTheme);
  }

  const currentTheme = arrayOfThemes.find(
    (theme) => theme.name.toLowerCase() === mode
  );

  return (
    <span onClick={toggleTheme} className='card p-2' role='button'>
      {currentTheme?.icon}
    </span>
  );
}
