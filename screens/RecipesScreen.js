import { View, Text } from "react-native";
import Header from "../components/Header";

export default function RecipesScreen({ navigation }) {
  return (
    <View>
      <Header
        title="Recipes"
        showSettings
        onSettingsPress={() => navigation.navigate("Settings")}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Recipes Screen</Text>
      </View>
    </View>
  );
}
