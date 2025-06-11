import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";

export const deleteUserFromCustomTable = async (userId) => {
  try {
    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting user from custom users table:", error);
  }
};

export const clearAllEntries = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing all entries: ", error);
  }
};

export const clearSpecificDataType = async (dataType) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const filteredKeys = keys.filter((key) => key.startsWith(dataType));
    await AsyncStorage.multiRemove(filteredKeys);
  } catch (error) {
    console.error(`Error clearing data of type ${dataType}: `, error);
  }
};

export const clearUserData = async (userId, dataType) => {
  try {
    switch (dataType) {
      case "symptoms":
        await supabase.from("daily_tracker").delete().eq("user_id", userId);
        break;
      case "saved_recipes":
        await supabase
          .from("user_saved_recipes")
          .delete()
          .eq("user_id", userId);
        break;
      case "all":
        await Promise.all([
          supabase.from("daily_tracker").delete().eq("user_id", userId),
          supabase.from("user_saved_recipes").delete().eq("user_id", userId),
        ]);
        break;
      default:
        throw new Error("Unknown data type");
    }
  } catch (error) {
    console.error("Error clearing user data: ", error);
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    await deleteUserFromCustomTable(userId);
    await clearAllEntries();
  } catch (error) {
    console.error("Error deleting account: ", error);
  }
};
