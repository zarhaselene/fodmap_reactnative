import { View, Text } from "react-native";
import Header from "../components/shared/Header";

export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <Header
        title="Profile"
        showSettings
        onSettingsPress={() => navigation.navigate("Settings")}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Profile Screen</Text>
      </View>
    </View>
  );
}
