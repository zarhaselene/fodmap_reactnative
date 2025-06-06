import { supabase } from '../utils/supabase';

let cachedRecipes = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

export const getRecipes = async () => {
  try {
    const now = Date.now();

    // Return cached data if it's fresh
    if (cachedRecipes && now - lastFetchTime < CACHE_DURATION) {
      console.log('Returning cached recipes');
      return cachedRecipes;
    }

    console.log('Fetching fresh recipes from Supabase');
    const { data, error } = await supabase.from('recipes').select('*');

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Cache the results
    cachedRecipes = data;
    lastFetchTime = now;
    console.log('Successfully fetched recipes:', data?.length, 'items');

    return data;
  } catch (error) {
    console.error('Error in getRecipes:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    });
    throw error;
  }
};
