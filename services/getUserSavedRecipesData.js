import { supabase } from "../utils/supabase";

export async function getUserSavedRecipesCount(userId) {
  const { count, error } = await supabase
    .from("user_saved_recipes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (error) {
    return { count: 0, error };
  }
  return { count: count || 0, error: null };
}
