import { View, Text } from "react-native";
import Header from "../components/Header";

export default function FoodsScreen({ navigation }) {
  return (
    <View>
      <Header
        title="Food Database"
        showSettings
        onSettingsPress={() => navigation.navigate("Settings")}
      />
      <View className="flex-1 justify-center items-center">
        <Text>Food Database</Text>
      </View>
    </View>
  );
}
