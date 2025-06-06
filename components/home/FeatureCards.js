import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeatureCards = ({ onPressRecipes, onPressFoods, onPressSymptoms }) => {
  const features = [
    {
      id: 1,
      title: "Find Recipes",
      subtitle: "Browse FODMAP-friendly meals",
      icon: "restaurant-outline",
      iconBg: "#20B2AA",
      cardBg: "#E0F7FA",
      borderColor: "#B2DFDB",
      onPress: onPressRecipes,
    },
    {
      id: 2,
      title: "Food Database",
      subtitle: "Check FODMAP levels",
      icon: "server-outline",
      iconBg: "#4CAF50",
      cardBg: "#E8F5E8",
      borderColor: "#C8E6C9",
      onPress: onPressFoods,
    },
    {
      id: 3,
      title: "Track Symptoms",
      subtitle: "Log your daily progress",
      icon: "add-circle-outline",
      iconBg: "#9C27B0",
      cardBg: "#F3E5F5",
      borderColor: "#E1BEE7",
      onPress: onPressSymptoms,
    },
  ];

  return (
    <View className="px-md w-full">
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          onPress={feature.onPress}
          className="mb-sm"
          activeOpacity={0.7}
        >
          <View
            className="flex-row items-center p-md  rounded-2xl"
            style={{
              backgroundColor: feature.cardBg,
              borderWidth: 1,
              borderColor: feature.borderColor,
            }}
          >
            {/* Icon Circle */}
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-md"
              style={{ backgroundColor: feature.iconBg }}
            >
              <Ionicons name={feature.icon} size={24} color="white" />
            </View>

            {/* Text Content */}
            <View className="flex-1">
              <Text className="text-gray-800 text-lg font-semibold mb-1">
                {feature.title}
              </Text>
              <Text className="text-gray-600 text-base">
                {feature.subtitle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FeatureCards;
