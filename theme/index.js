import { useState, useEffect } from "react";
import { Appearance } from "react-native";

const THEME_KEY = "theme";

export const setThemePreference = async (theme) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Error setting theme preference: ", error);
  }
};

export const getThemePreference = async () => {
  try {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    return theme || "light"; // Default to light theme
  } catch (error) {
    console.error("Error getting theme preference: ", error);
    return "light"; // Default to light theme on error
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await getThemePreference();
      setTheme(savedTheme);
    };
    fetchTheme();
  }, []);

  return [theme, setThemePreference];
};
