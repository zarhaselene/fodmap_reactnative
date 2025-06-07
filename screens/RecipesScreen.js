import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/shared/Header";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { getRecipes } from "../services/getRecipes";
import SearchBar from "../components/shared/SearchBar";
import ToggleGridButton from "../components/shared/ToggleGridButton";
import RecipesList from "../components/recipesScreen/RecipesList";

export default function RecipesScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  function handleSearch(text) {
    if (!text.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title?.toLowerCase().includes(text.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(text.toLowerCase()) ||
        recipe.dietary_needs?.some((need) =>
          need?.toLowerCase().includes(text.toLowerCase())
        )
    );
    setFilteredRecipes(filtered);
  }

  function handleFilter() {
    console.log("Filter pressed!");
  }

  function handleToggleGrid() {
    setIsGridView((prev) => !prev);
  }

  return (
    <View className="flex-1">
      <Header title="Recipes" />
      <View className="flex-1 items-center">
        <View className="bg-white p-4 w-full gap-8">
          <View className="flex-row items-center gap-4">
            <SearchBar onChangeText={handleSearch} />
            <FilterButton onPress={handleFilter} />
          </View>
          <View className="flex-row items-center justify-between">
            <Text>{filteredRecipes.length} recipes found</Text>
            <ToggleGridButton
              onPress={handleToggleGrid}
              isGridView={isGridView}
            />
          </View>
        </View>
        <ScrollView>
          {loading ? (
            <Text className="p-4">Loading recipes...</Text>
          ) : (
            <RecipesList recipes={filteredRecipes} isGridView={isGridView} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function FilterButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-12 w-12 rounded-lg border bg-neutral-100 border-neutral-300 justify-center items-center"
    >
      <AntDesignIcon name="filter" size={20} className="opacity-70" />
    </TouchableOpacity>
  );
}
