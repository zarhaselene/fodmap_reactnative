import { View, Text } from "react-native";

export default function NutritionTab({ recipe }) {
  const nutrition = [
    { label: "Calories", value: recipe.calories, unit: "kcal" },
    { label: "Protein", value: recipe.protein, unit: "g" },
    { label: "Fat", value: recipe.fat, unit: "g" },
    { label: "Carbs", value: recipe.carbs, unit: "g" },
    { label: "Fiber", value: recipe.fiber, unit: "g" },
    { label: "Sodium", value: recipe.sodium, unit: "mg" },
  ];

  return (
    <View>
      {/* Heading */}
      <Text className="text-xl font-semibold mb-4">Nutrition</Text>
      <Text className="text-neutral-600 mb-6">Per serving</Text>

      {/* Nutrition tiles in two columns */}
      <View className="flex-row flex-wrap gap-4">
        {nutrition.map((item, index) => (
          <View
            key={index}
            className="bg-surface-tertiary p-4 rounded-lg w-[48%]"
          >
            <Text className="text-sm text-text-secondary font-medium mb-1">
              {item.label}
            </Text>
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-text-brand">
                {item.value}
              </Text>
              <Text className="text-sm text-text-secondary ml-1">
                {item.unit}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
