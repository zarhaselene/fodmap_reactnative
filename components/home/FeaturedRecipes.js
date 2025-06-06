import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FeaturedRecipes = ({ onPressRecipe, onPressSeeAll }) => {
  const recipes = [
    {
      id: 1,
      title: "Lemon Herb Grilled Chicken",
      category: "Dinner",
      rating: 4.5,
      time: "25m",
      image: "",
      categoryColor: "#20B2AA",
    },
    {
      id: 2,
      title: "Quinoa Breakfast Bowl",
      category: "Breakfast",
      rating: 4.8,
      time: "20m",
      image: "",
      categoryColor: "#20B2AA",
    },
    {
      id: 3,
      title: "Mediterranean Salad",
      category: "Lunch",
      rating: 4.6,
      time: "15m",
      image: "",
      categoryColor: "#20B2AA",
    },
  ];

  return (
    <View className="mt-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-md mb-md">
        <Text className="text-gray-800 text-xl font-semibold">
          Featured Recipes
        </Text>
        <TouchableOpacity
          onPress={onPressSeeAll}
          className="flex-row items-center"
        >
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Recipe Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="mb-lg"
      >
        {recipes.map((recipe, index) => (
          <TouchableOpacity
            key={recipe.id}
            onPress={() => onPressRecipe(recipe)}
            activeOpacity={0.8}
            className={`bg-white rounded-xl shadow-sm ${
              index !== recipes.length - 1 ? "mr-md" : ""
            }`}
            style={{ width: 200, height: 200 }}
          >
            {/* Recipe Image */}
            <View className="relative">
              <Image
                source={{ uri: recipe.image }}
                className="w-full h-32 rounded-t-xl bg-gray-200"
                resizeMode="cover"
              />

              {/* Heart Icon */}
              <TouchableOpacity
                className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full items-center justify-center"
                activeOpacity={0.7}
              >
                <Ionicons name="heart-outline" size={18} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Category Badge */}
              <View
                className="absolute bottom-3 left-3 px-2 py-1 rounded"
                style={{ backgroundColor: recipe.categoryColor }}
              >
                <Text className="text-white text-xs font-medium">
                  {recipe.category}
                </Text>
              </View>
            </View>

            {/* Recipe Info */}
            <View className="p-3">
              <Text
                className="text-gray-800 font-medium text-sm mb-2"
                numberOfLines={2}
              >
                {recipe.title}
              </Text>

              <View className="flex-row items-center justify-between">
                {/* Rating */}
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} color="#FCD34D" />
                  <Text className="text-gray-600 text-xs ml-1">
                    {recipe.rating}
                  </Text>
                </View>

                {/* Time */}
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                  <Text className="text-gray-600 text-xs ml-1">
                    {recipe.time}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRecipes;
