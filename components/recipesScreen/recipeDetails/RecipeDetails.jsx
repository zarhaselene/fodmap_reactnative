import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { forwardRef, useEffect, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';
import StarRating from '../../shared/StarRating';
import { getRecipeTips } from '../../../services/getRecipeTips';
import InfoTiles from './InfoTiles';
import FodmapInformation from './FodmapInformation';
import { getRecipeIngredients } from '../../../services/getRecipeIngredients';

const RecipeDetails = forwardRef(({ recipe }, ref) => {
  const [activeTab, setActiveTab] = useState('ingredients');
  const [recipeTips, setRecipeTips] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);

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

  console.log(recipe);
  console.log(recipeTips);
  console.log(recipeIngredients);

  return (
    <ActionSheet gestureEnabled ref={ref}>
      <ScrollView bounces={false} className='flex-col p-4 mb-32'>
        <View className='gap-2'>
          {/* Recipe title  */}
          <Text className='text-3xl font-bold'>{recipe?.title}</Text>
          {/* Star rating  */}
          <StarRating rating={recipe.rating} reviews={recipe.reviews} />
          {/* Information tiles  */}
          <InfoTiles recipe={recipe} />
          {/* FODMAP information  */}
          <FodmapInformation recipeTips={recipeTips} />
          {/* Tab manu  */}
          <View className='flex-row border-border border-b'>
            <TouchableOpacity className='flex-1' onPress={() => setActiveTab('ingredients')}>
              <Text
                className={`${
                  activeTab === 'ingredients' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1' onPress={() => setActiveTab('instructions')}>
              <Text
                className={`${
                  activeTab === 'instructions' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Instructions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1' onPress={() => setActiveTab('nutrition')}>
              <Text
                className={`${
                  activeTab === 'nutrition' ? 'text-primary border-primary border-b ' : 'text-text-muted'
                } text-center pb-4 font-semibold`}
              >
                Nutrition
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ActionSheet>
  );
});

export default RecipeDetails;
