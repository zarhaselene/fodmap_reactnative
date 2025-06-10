import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/shared/Header";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import SearchBar from "../components/shared/SearchBar";
import FilterModal from "../components/shared/FilterModal";
import ToggleGridButton from "../components/shared/ToggleGridButton";
import RecipesList from "../components/recipesScreen/RecipesList";
import EmptyState from "../components/shared/EmptyState";

// Define your filter options
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

const dietaryNeeds = [
  "Gluten-Free",
  "Dairy-Free",
  "Vegan",
  "Lactose-Free",
  "Vegetarian",
  "Nut-Free",
  "Soy-Free",
  "Sugar-Free",
];

export default function RecipesScreen({ navigation }) {
  const [isGridView, setIsGridView] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [filters, setFilters] = useState({
    mealTypes: [],
    dietaryNeeds: [],
  });

  // Fetch recipes from Supabase
  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("recipes").select("*");
        if (error) throw error;
        setRecipes(data || []);
        setFilteredRecipes(data || []);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setRecipes([]);
        setFilteredRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  // Filter recipes whenever search, recipes, or filters change
  useEffect(() => {
    let filtered = recipes;

    // Filter by search
    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title?.toLowerCase().includes(lower) ||
          recipe.description?.toLowerCase().includes(lower) ||
          (Array.isArray(recipe.dietary_needs) &&
            recipe.dietary_needs.some((need) =>
              need?.toLowerCase().includes(lower)
            ))
      );
    }

    // Filter by mealTypes (category)
    if (filters.mealTypes.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.mealTypes.includes(recipe.category)
      );
    }

    // Filter by dietaryNeeds
    if (filters.dietaryNeeds.length > 0) {
      filtered = filtered.filter(
        (recipe) =>
          Array.isArray(recipe.dietary_needs) &&
          filters.dietaryNeeds.every((need) =>
            recipe.dietary_needs.includes(need)
          )
      );
    }

    setFilteredRecipes(filtered);
  }, [search, recipes, filters]);

  function resetFilters() {
    setFilters({
      mealTypes: [],
      dietaryNeeds: [],
    });
  }

  function toggleFilter(type, value) {
    setFilters((prev) => {
      const arr = prev[type];
      return {
        ...prev,
        [type]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  function handleToggleGrid() {
    setIsGridView((prev) => !prev);
  }

  return (
    <View className="flex-1">
      <Header
        title="Recipes"
        showProfile
        onProfilePress={() => navigation.navigate("Profile")}
      />
      <View className="flex-1 items-center">
        <View className="bg-white p-4 w-full gap-8">
          <View className="flex-row items-center gap-4">
            <SearchBar
              search={search}
              onSearchChange={setSearch}
              onFilterPress={() => setShowFilters(true)}
              placeholder="Search recipes..."
            />
            <FilterModal
              visible={showFilters}
              onClose={() => setShowFilters(false)}
              onResetFilters={resetFilters}
              filterSections={[
                {
                  title: "Meal Types",
                  options: mealTypes,
                  selectedValues: filters.mealTypes,
                  onToggle: (value) => toggleFilter("mealTypes", value),
                },
                {
                  title: "Dietary Needs",
                  options: dietaryNeeds,
                  selectedValues: filters.dietaryNeeds,
                  onToggle: (value) => toggleFilter("dietaryNeeds", value),
                },
              ]}
            />
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
            <EmptyState type="loading" />
          ) : filteredRecipes.length === 0 ? (
            <EmptyState
              icon="book-outline"
              title="No recipes found"
              description="Try searching or adjusting your filters."
            />
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
