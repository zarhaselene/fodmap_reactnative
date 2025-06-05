import { View, Text } from "react-native";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <View>
      <Header
        title="FODMAP Helper"
        showProfile
        onNotificationPress={() => {}}
        onProfilePress={() => navigation.navigate("Profile")}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Home Screen</Text>
      </View>
    </View>
  );
}
