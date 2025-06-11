import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function InfoTiles({ recipe }) {
  function increaseServingSize() {
    console.log("Increase pressed!");
  }

  function decreaseServingSize() {
    console.log("Decrease pressed!");
  }

  return (
    <View className="flex-row w-full gap-4 mt-4">
      {/* Prep time  */}
      <View className="flex-1 items-center bg-surface-secondary rounded-lg p-4">
        <Text className="text-brand-primary">
          <MaterialCommunityIcons name="clock-outline" size={20} />
        </Text>
        <Text className="text-text-muted text-sm">Prep</Text>
        <Text className="font-semibold">{recipe.prep_time}m</Text>
      </View>
      {/* Cook time  */}
      <View className="flex-1 items-center bg-surface-secondary rounded-lg p-4">
        <Text className="text-brand-primary">
          <MaterialCommunityIcons name="alarm" size={20} />
        </Text>
        <Text className="text-text-muted text-sm">Cook</Text>
        <Text className="font-semibold">{recipe.cook_time}m</Text>
      </View>
      {/* Fodmap level  */}
      <View className="flex-1 items-center bg-surface-secondary rounded-lg p-4">
        <Text className="text-brand-primary">
          <MaterialCommunityIcons name="chart-arc" size={20} />
        </Text>
        <Text className="text-text-muted text-sm">Fodmap</Text>
        <Text className="font-semibold">{recipe.level.split(" ")[0]}</Text>
      </View>
      {/* Calories  */}
      <View className="flex-1 items-center bg-surface-secondary rounded-lg p-4">
        <Text className="text-brand-primary">
          <MaterialCommunityIcons name="fire" size={20} />
        </Text>
        <Text className="text-text-muted text-sm">Calories</Text>
        <Text className="font-semibold">{recipe.calories}</Text>
      </View>
    </View>
  );
}
