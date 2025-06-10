import { View, Text } from "react-native";

const FodmapLegend = () => {
  const legendItems = [
    {
      color: "bg-green-500",
      label: "Low",
      description: "Safe to eat",
      textColor: "text-green-700",
    },

    {
      color: "bg-yellow-500",
      label: "Moderate",
      description: "Watch portions",
      textColor: "text-yellow-700",
    },

    {
      color: "bg-red-500",
      label: "High",
      description: "Avoid",
      textColor: "text-red-700",
    },
  ];

  return (
    <View className="flex-row justify-around bg-white px-4 py-3 border-b border-gray-100">
      {legendItems.map((item, index) => (
        <View key={index} className="items-center">
          <View className={`w-4 h-4 rounded-full ${item.color} mb-1`} />

          <Text className={`text-xs font-medium ${item.textColor}`}>
            {item.label}
          </Text>

          <Text className="text-xs text-gray-500">{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

export default FodmapLegend;
