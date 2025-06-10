import { supabase } from "../utils/supabase";

// Fetch user
export async function getUserData(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

// Update user
export async function updateUserData(userId, updates) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .single();
  return { data, error };
}
