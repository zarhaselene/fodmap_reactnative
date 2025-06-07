import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";

const FeaturedRecipes = ({ onPressRecipe, onPressSeeAll }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select("id, title, category, rating, total_time, image")
        .in("id", [16, 4, 17]);
      if (!error && data) {
        const order = [16, 4, 17];
        setRecipes(
          data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
        );
      }
      setLoading(false);
    };
    fetchFeaturedRecipes();
  }, []);

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
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#20B2AA"
          style={{ marginVertical: 32 }}
        />
      ) : (
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
                  // source={
                  //   recipe.image
                  //     ? { uri: recipe.image }
                  //     : require("../../assets/placeholder.png")
                  // }
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
                  style={{ backgroundColor: "#20B2AA" }}
                >
                  <Text className="text-white text-xs font-medium">
                    {recipe.category}
                  </Text>
                </View>
              </View>

              {/* Recipe Info */}
              <View className="p-4">
                <Text
                  className="text-gray-800 font-medium text-md mb-3"
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
                      {recipe.total_time ? `${recipe.total_time}m` : ""}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FeaturedRecipes;
