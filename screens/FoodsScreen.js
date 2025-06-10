import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Header from "../components/shared/Header";
import SearchBar from "../components/shared/SearchBar";
import FilterModal from "../components/shared/FilterModal";
import ToggleGridButton from "../components/shared/ToggleGridButton";
import EmptyState from "../components/shared/EmptyState";

import FoodsList from "../components/foods/FoodsList";
import { supabase } from "../utils/supabase";

export default function FoodsScreen() {
  const [isGridView, setIsGridView] = useState(false);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const fodmapLevels = [
    { value: "low", label: "Low" },
    { value: "moderate", label: "Moderate" },
    { value: "high", label: "High" },
  ];

  const categories = [
    "Vegetable",
    "Fruit",
    "Grains",
    "Dairy",
    "Protein",
    "Berries",
    "Legumes",
    "Nuts & Seeds",
    "Sweetener",
  ];

  const dietaryOptions = [
    { key: "gluten_free", label: "Gluten free" },
    { key: "lactose_free", label: "Lactose free" },
    { key: "dairy_free", label: "Dairy free" },
    { key: "vegan", label: "Vegan" },
    { key: "vegetarian", label: "Vegetarian" },
  ];
  // Filters state
  const [filters, setFilters] = useState({
    fodmapLevels: [],
    category: [],
    dietaryOptions: [],
  });

  // Fetch Foods from Supabase
  useEffect(() => {
    async function fetchFoods() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("foods").select("*");
        if (error) throw error;
        setFoods(data || []);
        setFilteredFoods(data || []);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
        setFoods([]);
        setFilteredFoods([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  useEffect(() => {
    let filtered = foods;

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (food) =>
          food.name?.toLowerCase().includes(lower) ||
          food.category?.toLowerCase().includes(lower) ||
          food.serving_size?.toLowerCase().includes(lower) ||
          (Array.isArray(food.fodmap_types) &&
            food.fodmap_types.some((type) =>
              type?.toLowerCase().includes(lower)
            )) ||
          (Array.isArray(food.low_fodmap_alternatives) &&
            food.low_fodmap_alternatives.some((alt) =>
              alt?.toLowerCase().includes(lower)
            )) ||
          Object.keys(food).some(
            (key) =>
              typeof food[key] === "boolean" &&
              food[key] === true &&
              key.toLowerCase().includes(lower)
          )
      );
    }
    // Filter by FODMAP Level
    if (filters.fodmapLevels.length > 0) {
      filtered = filtered.filter((food) =>
        filters.fodmapLevels.includes(food.fodmap_level?.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter((food) =>
        filters.category.includes(food.category)
      );
    }

    // Filter by dietaryOptions
    if (filters.dietaryOptions.length > 0) {
      filtered = filtered.filter((food) =>
        filters.dietaryOptions.every((key) => food[key] === true)
      );
    }

    setFilteredFoods(filtered);
  }, [search, foods, filters]);

  function resetFilters() {
    setFilters({
      fodmapLevels: [],
      category: [],
      dietaryOptions: [],
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
      <Header title="Foods" />
      <View className="flex-1 items-center">
        <View className="bg-white p-4 w-full gap-8">
          <View className="flex-row items-center gap-4">
            <SearchBar
              search={search}
              onSearchChange={setSearch}
              onFilterPress={() => setShowFilters(true)}
              placeholder="Search foods..."
            />
            <FilterModal
              visible={showFilters}
              onClose={() => setShowFilters(false)}
              onResetFilters={resetFilters}
              filterSections={[
                {
                  title: "FODMAP Level",
                  options: fodmapLevels,
                  selectedValues: filters.fodmapLevels,
                  onToggle: (value) => toggleFilter("fodmapLevels", value),
                  keyField: "value",
                },
                {
                  title: "Food Categories",
                  options: categories,
                  selectedValues: filters.category,
                  onToggle: (value) => toggleFilter("category", value),
                },
                {
                  title: "Dietary Restrictions",
                  options: dietaryOptions,
                  selectedValues: filters.dietaryOptions,
                  onToggle: (value) => toggleFilter("dietaryOptions", value),
                  keyField: "key",
                },
              ]}
            />
          </View>
          <View className="flex-row items-center justify-between">
            <Text>{filteredFoods.length} Foods found</Text>
            <ToggleGridButton
              onPress={handleToggleGrid}
              isGridView={isGridView}
            />
          </View>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          {loading ? (
            <EmptyState type="loading" />
          ) : filteredFoods.length === 0 ? (
            <EmptyState
              icon="book-outline"
              title="No Foods found"
              description="Try searching or adjusting your filters."
            />
          ) : (
            <FoodsList foods={filteredFoods} isGridView={isGridView} />
          )}
        </View>
      </View>
    </View>
  );
}
