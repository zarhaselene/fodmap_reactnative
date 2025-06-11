import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const FodmapLegend = () => {
  const [expanded, setExpanded] = useState(true);

  const legendItems = [
    {
      color: "bg-green-500",
      label: "Low",
      description: "Safe to eat",
      labelColor: "text-green-700",
      descColor: "text-green-700",
    },
    {
      color: "bg-yellow-500",
      label: "Moderate",
      description: "Watch portions",
      labelColor: "text-yellow-700",
      descColor: "text-yellow-700",
    },
    {
      color: "bg-red-500",
      label: "High",
      description: "Avoid",
      labelColor: "text-red-700",
      descColor: "text-red-700",
    },
  ];

  return (
    <View className="w-full ">
      <TouchableOpacity
        className="flex-row items-center mb-2"
        onPress={() => setExpanded((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text className="font-bold text-base flex-1 mb-4">FODMAP Levels</Text>
        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#6b7280"
        />
        <Text className="text-xs text-text-muted ml-1">
          {expanded ? "Hide" : "Show"}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View className="flex-row justify-between w-full">
          {legendItems.map((item, index) => (
            <View key={index} className="items-center flex-1">
              <View className={`w-4 h-4 rounded-full ${item.color} mb-1`} />
              <Text className={`text-sm font-medium ${item.labelColor}`}>
                {item.label}
              </Text>
              <Text className={`text-xs ${item.descColor}`}>
                {item.description}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default FodmapLegend;
