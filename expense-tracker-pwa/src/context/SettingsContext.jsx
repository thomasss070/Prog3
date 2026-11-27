import { createContext, useContext, useEffect, useState } from 'react';

const SETTINGS_KEY = '@expensetracker/settings';
const DEFAULT_SETTINGS = { notifications: false, darkMode: false };

const SettingsContext = createContext(null);

function readSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw === null) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (error) {
    console.warn('Ajustes guardados dañados, se usan los valores por defecto:', error);
    return DEFAULT_SETTINGS;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => readSettings());


  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('No se pudieron guardar los ajustes:', error);
    }
  }, [settings]);

  useEffect(() => {
  document.documentElement.dataset.theme = settings.darkMode ? 'dark' : 'light';
   }, [settings.darkMode]);


  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}