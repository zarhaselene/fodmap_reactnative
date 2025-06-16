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
import RecipeCard from "../recipesScreen/RecipeCard";

const FeaturedRecipes = ({ onPressRecipe, onPressSeeAll }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .in("id", [16, 4, 17]);
      if (!error && data) {
        const order = [16, 4, 17];
        // Ensure dietary_needs is always an array and level has a default value
        const processedData = data.map((recipe) => ({
          ...recipe,
          dietary_needs: recipe.dietary_needs || [],
          level: recipe.level || "Low",
        }));
        setRecipes(
          processedData.sort(
            (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
          )
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
        <Text className="text-text-primary text-xl font-semibold">
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
          className="mb-lg flex-row flex-wrap p-2"
        >
          {recipes.map((recipe, index) => (
            <View key={index} style={{ width: 200 }}>
              <RecipeCard
                recipe={recipe}
                isGridView={true}
                isFeatured={true}
                // onRecipeUnsaved={onRecipeUnsaved}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default FeaturedRecipes;
