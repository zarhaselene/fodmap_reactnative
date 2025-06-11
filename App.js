import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import "./global.css";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
