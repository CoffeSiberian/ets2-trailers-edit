import { createContext, useState, useContext, useEffect } from 'react';
import { DarkModeTypes, DarkModeContextTypes } from '../types/ContexTypes';

const DarkModeContex = createContext<DarkModeContextTypes>();

export const useDarkMode = (): DarkModeContextTypes => {
  return useContext(DarkModeContex);
};

export const DarkMode = ({ children }: any) => {
  const [darkMode, setDarkModeState] = useState<boolean>(false);

  const darkTailwind: DarkModeTypes = {
    primary: {
      main: 'bg-neutral-900',
      color: 'white',
      border_color: 'hover:border-cyan-600',
    },
    secondary: {
      main: 'bg-stone-800',
      main_contrast: 'bg-stone-600',
      color: 'white',
      border_color: 'hover:border-cyan-600',
    },
  };

  const lightTailwind: DarkModeTypes = {
    primary: {
      main: 'bg-white',
      color: 'black',
      border_color: 'hover:border-cyan-600',
    },
    secondary: {
      main: 'bg-gray-300',
      main_contrast: 'bg-gray-200',
      color: 'black',
      border_color: 'hover:border-cyan-600',
    },
  };

  const themeTatailwind = darkMode ? darkTailwind : lightTailwind;

  const setDarkMode = (darkModeBool: boolean) => {
    localStorage.setItem('darkMode', darkModeBool.toString());
    setDarkModeState(darkModeBool);
  };

  useEffect(() => {
    const darkModeLocal = localStorage.getItem('darkMode');
    if (darkModeLocal !== null) {
      setDarkModeState(JSON.parse(darkModeLocal));
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }, []);

  return (
    <DarkModeContex.Provider value={{ darkMode, themeTatailwind, setDarkMode }}>
      {children}
    </DarkModeContex.Provider>
  );
};
