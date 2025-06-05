import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";

import "./global.css";

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
