import { TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleFavorite, getSavedRecipeIds } from '../../../services/getUserSavedRecipesData';
import { useAuth } from '../../../context/AuthContext';
import { useState, useEffect } from 'react';

export default function FavoriteButton({ className, recipeId, onRecipeUnsaved }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if recipe is already saved
  useEffect(() => {
    async function checkIfSaved() {
      if (!user?.id || !recipeId) return;

      try {
        const savedRecipeIds = await getSavedRecipeIds(user.id);
        setIsSaved(savedRecipeIds.includes(recipeId));
      } catch (error) {
        console.error('Error checking if recipe is saved:', error);
      }
    }

    checkIfSaved();
  }, [user?.id, recipeId]);

  async function handleToggleFavorite() {
    if (!user?.id || isLoading) return;

    setIsLoading(true);
    try {
      const result = await toggleFavorite(user.id, recipeId);
      setIsSaved(result.isSaved);
      console.log(`Recipe ${result.action}:`, recipeId);

      // If recipe was unsaved and we have a callback, call it
      if (!result.isSaved && onRecipeUnsaved) {
        onRecipeUnsaved(recipeId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableOpacity
      onPress={handleToggleFavorite}
      className={`${className} ` + 'bg-surface-tertiary p-2 rounded-full'}
      disabled={isLoading || !user}
    >
      <Text className={isSaved ? 'text-red-600' : 'text-primary'}>
        <MaterialCommunityIcons name={isSaved ? 'heart' : 'heart-outline'} size={20} />
      </Text>
    </TouchableOpacity>
  );
}
