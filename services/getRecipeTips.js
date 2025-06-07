import { supabase } from '../utils/supabase';

let cachedTips = new Map();
let lastFetchTimes = new Map();
const CACHE_DURATION = 60000; // 1 minute cache

export const getRecipeTips = async (recipeId) => {
  try {
    const now = Date.now();
    const lastFetchTime = lastFetchTimes.get(recipeId) || 0;

    // Return cached data if it's fresh
    if (cachedTips.has(recipeId) && now - lastFetchTime < CACHE_DURATION) {
      console.log(`Returning cached tips for recipe ${recipeId}`);
      return cachedTips.get(recipeId);
    }

    console.log(`Fetching fresh tips from Supabase for recipe ${recipeId}`);
    const { data, error } = await supabase.from('recipe_fodmap_tips').select('tip').eq('recipe_id', recipeId);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Cache the results
    cachedTips.set(recipeId, data);
    lastFetchTimes.set(recipeId, now);
    console.log(`Successfully fetched tips for recipe ${recipeId}:`, data?.length, 'items');

    return data;
  } catch (error) {
    console.error('Error in getRecipeTips:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
};
