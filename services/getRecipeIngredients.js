import { supabase } from '../utils/supabase';

let cachedIngredients = new Map();
let lastFetchTimes = new Map();
const CACHE_DURATION = 60000; // 1 minute cache

export const getRecipeIngredients = async (recipeId) => {
  try {
    const now = Date.now();
    const lastFetchTime = lastFetchTimes.get(recipeId) || 0;

    // Return cached data if it's fresh
    if (cachedIngredients.has(recipeId) && now - lastFetchTime < CACHE_DURATION) {
      console.log(`Returning cached ingredients for recipe ${recipeId}`);
      return cachedIngredients.get(recipeId);
    }

    console.log(`Fetching fresh ingredients from Supabase for recipe ${recipeId}`);
    const { data, error } = await supabase
      .from('recipe_ingredients')
      .select('measurement_system, ingredient, order_index')
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Cache the results
    cachedIngredients.set(recipeId, data);
    lastFetchTimes.set(recipeId, now);
    console.log(`Successfully fetched ingredients for recipe ${recipeId}:`, data?.length, 'items');

    return data;
  } catch (error) {
    console.error('Error in getRecipeIngredients:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
};
