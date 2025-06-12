import { supabase } from '../utils/supabase';

export async function getUserSavedRecipesCount(userId) {
  const { count, error } = await supabase
    .from('user_saved_recipes')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    return { count: 0, error };
  }
  return { count: count || 0, error: null };
}

// Get all saved recipe IDs for a user
export async function getSavedRecipeIds(userId) {
  const { data, error } = await supabase.from('user_saved_recipes').select('recipe_id').eq('user_id', userId);
  if (error) throw error;
  return data.map((row) => row.recipe_id);
}

// Add a recipe to favorites
export async function addFavorite(userId, recipeId) {
  const { error } = await supabase.from('user_saved_recipes').insert([{ user_id: userId, recipe_id: recipeId }]);
  if (error) throw error;
}

// Remove a recipe from favorites
export async function removeFavorite(userId, recipeId) {
  const { error } = await supabase.from('user_saved_recipes').delete().eq('user_id', userId).eq('recipe_id', recipeId);
  if (error) throw error;
}

// Toggle a recipe as favorite
export async function toggleFavorite(userId, recipeId) {
  // First check if the recipe is already saved
  const { data: existingData, error: checkError } = await supabase
    .from('user_saved_recipes')
    .select('id')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 is "not found" error, which is expected when recipe isn't saved
    throw checkError;
  }

  if (existingData) {
    // Recipe is already saved, remove it
    const { error } = await supabase
      .from('user_saved_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);
    if (error) throw error;
    return { action: 'removed', isSaved: false };
  } else {
    // Recipe is not saved, add it
    const { error } = await supabase.from('user_saved_recipes').insert([{ user_id: userId, recipe_id: recipeId }]);
    if (error) throw error;
    return { action: 'added', isSaved: true };
  }
}

// Get all saved recipes for a user with full recipe data
export async function getSavedRecipes(userId) {
  const { data, error } = await supabase
    .from('user_saved_recipes')
    .select(
      `
      recipe_id,
      recipes (*)
    `
    )
    .eq('user_id', userId);

  if (error) throw error;

  // Return just the recipe data
  return data.map((item) => item.recipes);
}
