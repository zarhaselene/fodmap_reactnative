import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View>
      <Header
        title="Recipes"
        showSettings
        showProfile
        onSettingsPress={""}
        onProfilePress={""}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Profile Screen</Text>
      </View>
    </View>
  );
}
