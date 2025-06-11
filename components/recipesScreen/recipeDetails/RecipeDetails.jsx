import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { forwardRef, useEffect, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import StarRating from '../../shared/StarRating';
import { getRecipeTips } from '../../../services/getRecipeTips';
import InfoTiles from './InfoTiles';
import FodmapInformation from './FodmapInformation';
import { getRecipeIngredients } from '../../../services/getRecipeIngredients';
import IngredientsTab from './IngredientsTab';
import InstructionsTab from './InstructionsTab';
import NutritionTab from './NutritionTab';
import { getRecipeInstructions } from '../../../services/getRecipeInstructions';
import FavoriteButton from './FavoriteButton';

const RecipeDetails = forwardRef(({ recipe }, ref) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [recipeTips, setRecipeTips] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const recipeTags = [recipe.level, ...recipe.dietary_needs];

  // Fetch recipe tips
  useEffect(() => {
    async function fetchRecipeTips() {
      try {
        const tips = await getRecipeTips(recipe.id);
        setRecipeTips(tips);
      } catch (error) {
        console.error('Error fetching recipe tips:', error);
      }
    }

    if (recipe?.id) {
      fetchRecipeTips();
    }
  }, [recipe?.id]);

  // Fetch recipe ingredients
  useEffect(() => {
    async function fetchRecipeIngredients() {
      try {
        const ingredient = await getRecipeIngredients(recipe.id);
        setRecipeIngredients(ingredient);
      } catch (error) {
        console.error('Error fetching recipe ingredients:', error);
      }
    }
    if (recipe?.id) {
      fetchRecipeIngredients();
    }
  }, [recipe?.id]);

  // Fetch recipe instructions
  useEffect(() => {
    async function fetchRecipeInstructions() {
      try {
        const instruction = await getRecipeInstructions(recipe.id);
        setRecipeInstructions(instruction);
      } catch (error) {
        console.error('Error fetching recipe instruction:', error);
      }
    }
    if (recipe?.id) {
      fetchRecipeInstructions();
    }
  }, [recipe?.id]);

  console.log(recipe);

  return (
    <ActionSheet className='relative' gestureEnabled ref={ref}>
      {/* Favorite Button  */}
      <FavoriteButton className='absolute top-4 right-4 z-10' recipeId={recipe.id} />
      <ScrollView bounces={false} className='flex-col p-4 max-h-[600px] mb-16'>
        <View className='gap-2'>
          <View className='flex-row items-center justify-between'>
            {/* Recipe title  */}
            <Text className='text-3xl font-bold pr-8'>{recipe.title}</Text>
          </View>
          {/* Star rating  */}
          <StarRating rating={recipe.rating} reviews={recipe.reviews} />
          {/* Information tiles  */}
          <InfoTiles recipe={recipe} />
          {/* FODMAP information  */}
          <FodmapInformation recipeTips={recipeTips} />
          {/* Tab manu  */}
          <View className='flex-row gap-12 border-border border-b mb-4'>
            <TouchableOpacity onPress={() => setActiveTab('ingredients')}>
              <Text
                className={`${
                  activeTab === 'ingredients' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('instructions')}>
              <Text
                className={`${
                  activeTab === 'instructions' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Instructions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('nutrition')}>
              <Text
                className={`${
                  activeTab === 'nutrition' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Nutrition
              </Text>
            </TouchableOpacity>
          </View>
          {/* Ingredients tab  */}
          {activeTab === 'ingredients' && (
            <IngredientsTab recipe={recipe} recipeIngredients={recipeIngredients} recipeId={recipe.id} />
          )}
          {/* Instructions tab  */}
          {activeTab === 'instructions' && (
            <InstructionsTab recipeInstructions={recipeInstructions} recipeId={recipe.id} />
          )}
          {/* Nutrition tab  */}
          {activeTab === 'nutrition' && <NutritionTab recipe={recipe} recipeId={recipe.id} />}
          {/* Tags  */}
          <Text className='text-lg font-bold mt-4'>Tags</Text>
          <View className='flex-row flex-wrap gap-2'>
            {recipeTags.map((tag, index) => (
              <View key={index} className='bg-surface-tertiary px-3 py-2 rounded-full'>
                <Text className='text-text-secondary'>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ActionSheet>
  );
});

export default RecipeDetails;
