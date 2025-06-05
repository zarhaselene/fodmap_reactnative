import { View, Text } from "react-native";
import Header from "../components/Header";
export default function RecipesScreen() {
  return (
    <View>
      <Header
        title="Recipes"
        showSearch
        showProfile
        onSearchPress={""}
        onProfilePress={""}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Recipes Screen</Text>
      </View>
    </View>
  );
}
