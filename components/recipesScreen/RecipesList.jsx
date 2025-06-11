import { View } from 'react-native';
import RecipeCard from './RecipeCard';

export default function RecipesList({ recipes, isGridView, onRecipeUnsaved }) {
  return (
    <View className='flex-row flex-wrap p-2'>
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={recipe} isGridView={isGridView} key={index} onRecipeUnsaved={onRecipeUnsaved} />
      ))}
      {/* Hack to insert an empty <View/> with width 50% when only one search result to not break layout */}
      {(recipes.length && isGridView) <= 1 && <View className='w-1/2'></View>}
    </View>
  );
}
