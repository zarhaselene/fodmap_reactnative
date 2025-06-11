import { View, Text } from 'react-native';
import Header from '../components/shared/Header';
import RecipesList from '../components/recipesScreen/RecipesList';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedRecipes } from '../services/getUserSavedRecipesData';

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleRecipeUnsaved = (recipeId) => {
    setSavedRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const recipes = await getSavedRecipes(user.id);
        setSavedRecipes(recipes);
        setError(null);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setError('Failed to load saved recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [user?.id]);

  if (!user) {
    return (
      <View className='flex-1'>
        <Header showBack title={'Saved Recipes'} />
        <Text className='text-center mt-4'>Please log in to view saved recipes</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className='flex-1'>
        <Header showBack title={'Saved Recipes'} />
        <Text className='text-center mt-4'>Loading saved recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1'>
        <Header showBack title={'Saved Recipes'} />
        <Text className='text-center mt-4 text-red-500'>{error}</Text>
      </View>
    );
  }

  return (
    <View className='flex-1'>
      <Header showBack title={'Saved Recipes'} />
      {savedRecipes.length === 0 ? (
        <Text className='text-center mt-4'>No saved recipes yet</Text>
      ) : (
        <RecipesList recipes={savedRecipes} isGridView={false} onRecipeUnsaved={handleRecipeUnsaved} />
      )}
    </View>
  );
};

export default SavedRecipesScreen;
