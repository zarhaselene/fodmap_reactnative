import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import { supabase } from "../../utils/supabase";

export default function FoodsList({ foods = [], isGridView }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [alternatives, setAlternatives] = useState({});
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);

  // Dietary options for the FoodCard component
  const dietaryOptions = [
    { key: "gluten_free", label: "Gluten-Free" },
    { key: "lactose_free", label: "Lactose-Free" },
    { key: "dairy_free", label: "Dairy-Free" },
    { key: "vegan", label: "Vegan" },
    { key: "vegetarian", label: "Vegetarian" },
  ];

  // Fetch alternatives from database
  useEffect(() => {
    async function fetchAlternatives() {
      if (!foods || foods.length === 0) return;

      try {
        setLoadingAlternatives(true);
        const foodIds = foods.map((food) => food.id);

        // Get all alternatives for the current foods
        const { data: alternativesData, error } = await supabase
          .from("food_alternatives")
          .select(
            `
            food_id,
            alternative_name
          `
          )
          .in("food_id", foodIds);

        if (error) throw error;

        // Group alternatives by food_id
        const groupedAlternatives = {};
        alternativesData?.forEach((alt) => {
          if (!groupedAlternatives[alt.food_id]) {
            groupedAlternatives[alt.food_id] = [];
          }
          groupedAlternatives[alt.food_id].push(alt.alternative_name);
        });

        setAlternatives(groupedAlternatives);
      } catch (error) {
        console.error("Failed to fetch alternatives:", error);
        setAlternatives({});
      } finally {
        setLoadingAlternatives(false);
      }
    }

    fetchAlternatives();
  }, [foods]);

  const handleToggleExpand = (foodId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [foodId]: !prev[foodId],
    }));
  };

  const renderFoodItem = ({ item }) => (
    <FoodCard
      food={item}
      alternatives={alternatives}
      isExpanded={expandedItems[item.id] || false}
      onToggleExpand={handleToggleExpand}
      viewType={isGridView ? "grid" : "list"}
      dietaryOptions={dietaryOptions}
    />
  );

  const getItemLayout = (data, index) => ({
    length: isGridView ? 200 : 150,
    offset: (isGridView ? 200 : 150) * index,
    index,
  });

  const flatListKey = isGridView ? "grid" : "list";

  return (
    <FlatList
      data={foods}
      renderItem={renderFoodItem}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      numColumns={isGridView ? 2 : 1}
      key={flatListKey}
      columnWrapperStyle={
        isGridView
          ? {
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }
          : undefined
      }
      contentContainerStyle={{ padding: 8 }}
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
}
