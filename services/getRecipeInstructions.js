import { supabase } from '../utils/supabase';

let cachedInstructions = new Map();
let lastFetchTimes = new Map();
const CACHE_DURATION = 60000; // 1 minute cache

export const getRecipeInstructions = async (recipeId) => {
  try {
    const now = Date.now();
    const lastFetchTime = lastFetchTimes.get(recipeId) || 0;

    // Return cached data if it's fresh
    if (cachedInstructions.has(recipeId) && now - lastFetchTime < CACHE_DURATION) {
      console.log(`Returning cached instructions for recipe ${recipeId}`);
      return cachedInstructions.get(recipeId);
    }

    console.log(`Fetching fresh instructions from Supabase for recipe ${recipeId}`);
    const { data, error } = await supabase
      .from('recipe_instructions')
      .select('instruction, step_number')
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Cache the results
    cachedInstructions.set(recipeId, data);
    lastFetchTimes.set(recipeId, now);
    console.log(`Successfully fetched instructions for recipe ${recipeId}:`, data?.length, 'items');

    return data;
  } catch (error) {
    console.error('Error in getRecipeInstructions:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
};
