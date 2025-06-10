import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FoodCard = ({
  food,
  alternatives,
  isExpanded,
  onToggleExpand,
  viewType,
  dietaryOptions,
}) => {
  const getFodmapColors = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return { bg: "#DCFCE7", text: "#16A34A" };
      case "moderate":
        return { bg: "#FEF9C3", text: "#CA8A25" };
      case "high":
        return { bg: "#FEE2E2", text: "#E02926" };
      default:
        return { bg: "#d1d5db", text: "#374151" };
    }
  };

  const fodmapColors = getFodmapColors(food.fodmap_level);
  const foodAlternatives = alternatives[food.id] || [];
  const isGridView = viewType === "grid";

  function handlePress() {
    onToggleExpand(food.id);
  }

  // Grid card style
  if (isGridView) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        className="w-1/2 p-2"
        activeOpacity={0.95}
      >
        <View
          className="bg-white rounded-xl border border-gray-200 items-center py-4 px-2"
          style={{
            minHeight: 250,
            elevation: 1,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 1 },
          }}
        >
          {/* Name */}
          <Text
            className="text-lg font-bold text-gray-900 mb-2 text-center"
            numberOfLines={2}
          >
            {food.name}
          </Text>
          {/* FODMAP badge */}
          <View
            className="rounded px-3 py-1 mb-2"
            style={{ backgroundColor: fodmapColors.bg }}
          >
            <Text
              className="font-semibold text-sm"
              style={{ color: fodmapColors.text }}
            >
              {food.fodmap_level
                ? `${
                    food.fodmap_level.charAt(0).toUpperCase() +
                    food.fodmap_level.slice(1)
                  } FODMAP`
                : "FODMAP"}
            </Text>
          </View>
          {/* Category */}
          {food.category && (
            <Text
              className="text-sm text-gray-400 mb-2 text-center"
              numberOfLines={1}
            >
              {food.category}
            </Text>
          )}
          {/* Safe serving */}
          <View className="w-full bg-gray-50 rounded-lg py-3 px-2 my-2 items-center">
            <Text className="text-gray-500 font-medium mb-1">
              Safe serving:
            </Text>
            <Text
              className="text-lg font-bold"
              style={{ color: fodmapColors.text }}
            >
              {food.safe_serving_size || "Not specified"}
            </Text>
          </View>
          {/* Serving size */}
          {food.serving_size && (
            <Text className="text-xs text-gray-400 mb-2 italic text-center">
              {food.serving_size}
            </Text>
          )}
          {/* Expandable details */}
          {isExpanded && (
            <View className="w-full bg-gray-100 rounded-lg p-3 mt-2">
              {/* FODMAP Types */}
              {food.fodmap_types && food.fodmap_types.length > 0 && (
                <View className="mb-2">
                  <Text className="font-semibold text-sm text-gray-700 mb-1">
                    FODMAP Types:
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {Array.isArray(food.fodmap_types)
                      ? food.fodmap_types.join(", ")
                      : food.fodmap_types}
                  </Text>
                </View>
              )}

              {/* Low FODMAP Alternatives */}
              {foodAlternatives.length > 0 && (
                <View className="mb-2">
                  <Text className="font-semibold text-sm text-gray-700 mb-1">
                    Low FODMAP Alternatives:
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {foodAlternatives.join(", ")}
                  </Text>
                </View>
              )}

              {/* Dietary badges */}
              {dietaryOptions.filter((d) => food[d.key]).length > 0 && (
                <View className="mb-1">
                  <Text className="font-semibold text-sm text-gray-700 mb-1">
                    Dietary Info:
                  </Text>
                  <View className="flex-row flex-wrap gap-2 mt-2">
                    {dietaryOptions
                      .filter((d) => food[d.key])
                      .map((d) => (
                        <Text
                          key={d.key}
                          className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs"
                        >
                          {d.label}
                        </Text>
                      ))}
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Expand/collapse indicator */}
          <TouchableOpacity
            onPress={handlePress}
            className="mt-3"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-xs text-gray-500 mr-1">
                {isExpanded ? "Collapse" : "Expand"}
              </Text>
              <Ionicons
                name={
                  isExpanded ? "chevron-up-outline" : "chevron-down-outline"
                }
                size={18}
                color="#9ca3af"
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  // List view
  return (
    <TouchableOpacity onPress={handlePress} className="w-full p-1">
      <View className="bg-white rounded-lg border border-gray-200 p-4 m-1">
        {/* Header with FODMAP badge */}
        <View className="flex-col justify-between items-start mb-4">
          <View className="flex-row items-baseline gap-2">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {food.name}
            </Text>
            {food.category && (
              <Text className="text-sm text-gray-500 capitalize">
                ({food.category})
              </Text>
            )}
          </View>

          {/* FODMAP Level Badge */}
          <View
            className="rounded px-3 py-1 min-w-[100px] items-center"
            style={{ backgroundColor: fodmapColors.bg }}
          >
            <Text
              className="font-bold text-sm"
              style={{ color: fodmapColors.text }}
            >
              {food.fodmap_level?.toUpperCase()} FODMAP
            </Text>
          </View>
        </View>

        {/* Safe serving section */}
        <View className="border-t border-gray-100 pt-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 font-medium">Safe serving</Text>
            <Text
              className="text-lg font-bold"
              style={{ color: fodmapColors.text }}
            >
              {food.safe_serving_size || "Not specified"}
            </Text>
          </View>

          {food.serving_size && (
            <Text className="text-xs text-gray-400 mt-1 text-right">
              {food.serving_size}
            </Text>
          )}
        </View>

        {/* Expandable details */}
        {isExpanded && (
          <View className="border-t border-gray-100 pt-3 mt-3">
            {/* FODMAP Types */}
            {food.fodmap_types && food.fodmap_types.length > 0 && (
              <View className="mb-3">
                <Text className="font-semibold text-sm text-gray-700 mb-1">
                  FODMAP Types:
                </Text>
                <Text className="text-sm text-gray-600">
                  {Array.isArray(food.fodmap_types)
                    ? food.fodmap_types.join(", ")
                    : food.fodmap_types}
                </Text>
              </View>
            )}

            {/* Low FODMAP Alternatives */}
            {foodAlternatives.length > 0 && (
              <View className="mb-3">
                <Text className="font-semibold text-sm text-gray-700 mb-1">
                  Low FODMAP Alternatives:
                </Text>
                <Text className="text-sm text-gray-600">
                  {foodAlternatives.join(", ")}
                </Text>
              </View>
            )}

            {/* Dietary badges */}
            {dietaryOptions.filter((d) => food[d.key]).length > 0 && (
              <View>
                <Text className="font-semibold text-sm text-gray-700 mb-1">
                  Dietary Info:
                </Text>
                <View className="flex-row flex-wrap gap-2 mt-2">
                  {dietaryOptions
                    .filter((d) => food[d.key])
                    .map((d) => (
                      <Text
                        key={d.key}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {d.label}
                      </Text>
                    ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Expand/collapse indicator */}
        <View className="items-center mt-3 pt-2 border-t border-gray-100">
          <Ionicons
            name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
            size={24}
            color={isExpanded ? "#6b7280" : "#9ca3af"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
