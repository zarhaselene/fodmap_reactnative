import { supabase } from "../utils/supabase";

export const foodDataService = {
  // Fetch all foods
  async fetchFoods() {
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .order("name");
    return { data, error };
  },

  // Fetch all food alternatives
  async fetchFoodAlternatives() {
    const { data, error } = await supabase
      .from("food_alternatives")
      .select("*");
    return { data, error };
  },

  // Get unique FODMAP levels from foods data
  getUniqueFodmapLevels(foods) {
    const levels = [
      ...new Set(foods.map((food) => food.fodmap_level).filter(Boolean)),
    ];
    return levels.map((level) => ({ label: `${level} FODMAP`, value: level }));
  },

  // Get unique categories from foods data
  getUniqueCategories(foods) {
    return [...new Set(foods.map((food) => food.category).filter(Boolean))];
  },

  // Group alternatives by food_id
  groupAlternativesByFoodId(alternatives) {
    const grouped = {};
    alternatives.forEach((alt) => {
      if (!grouped[alt.food_id]) grouped[alt.food_id] = [];
      grouped[alt.food_id].push(alt.alternative_name);
    });

    return grouped;
  },

  // Filter foods based on search and filters
  filterFoods(foods, search, filters) {
    return foods.filter((food) => {
      // Search filter
      if (
        search &&
        !food.name.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }

      // FODMAP filter
      if (
        filters.fodmap.length > 0 &&
        !filters.fodmap.includes(food.fodmap_level)
      ) {
        return false;
      }

      // Category filter
      if (
        filters.category.length > 0 &&
        !filters.category.includes(food.category)
      ) {
        return false;
      }

      // Dietary filter
      if (
        filters.dietary.length > 0 &&
        !filters.dietary.every((key) => food[key])
      ) {
        return false;
      }
      return true;
    });
  },
};
