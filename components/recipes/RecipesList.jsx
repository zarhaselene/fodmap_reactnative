import { View } from "react-native";
import RecipeCard from "./RecipeCard";

export default function RecipesList({ recipes, isGridView }) {
  return (
    <View className="flex-row flex-wrap p-2">
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={recipe} isGridView={isGridView} key={index} />
      ))}
    </View>
  );
}
