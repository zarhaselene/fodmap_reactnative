import { View, Text } from "react-native";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  // Handle logout and navigation
  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <View className="flex-1">
      <Header title="FODMAP Helper" showLogout onLogoutPress={handleLogout} />
      <View className="flex-1 justify-center items-center">
        <Text>Home Screen</Text>
        <Text>Welcome, {user ? user.name : ""}!</Text>
      </View>
    </View>
  );
}
