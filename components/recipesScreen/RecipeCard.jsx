import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useRef } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import RecipeDetails from './recipeDetails/RecipeDetails';
import StarRating from '../shared/StarRating';

export default function RecipeCard({ recipe, isGridView }) {
  const actionSheetRef = useRef(null);

  // Function to render stars based on rating

  function handlePress() {
    actionSheetRef.current?.show();
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${isGridView ? 'w-1/2' : 'w-full'} shadow-sm shadow-border-dark`}
    >
      <View className={`${isGridView ? 'flex-col' : 'flex-row'} relative bg-surface-primary m-2 rounded-lg`}>
        {/* Recipe image  */}
        <View className={`${isGridView ? 'h-44' : 'w-1/3'}  `}>
          <Image
            className={`${isGridView ? 'h-44 rounded-t-lg' : 'h-32 rounded-tl-lg'} bg-gray-400 `}
            source={{ uri: recipe.image }}
          />

          {/* Favorite heart  */}
          <View className='p-1.5 items-center justify-center bg-white rounded-full absolute top-2 right-2'>
            <AntDesignIcon name='heart' color={'#ef4444'} size={14} />
          </View>

          {/* FODMAP level grid view */}
          {isGridView && (
            <Text className='absolute bottom-2 left-2 bg-fodmap-low text-green-50 px-2 py-1 rounded-lg font-semibold'>
              {recipe.level}
            </Text>
          )}
        </View>
        {/* Info Wrapper  */}
        <View className={`${isGridView ? 'w-full' : 'w-2/3'} p-4  gap-2`}>
          <View className={`${isGridView ? 'flex-col' : 'flex-row'} gap-2`}>
            <View className='flex-1 gap-2'>
              {/* Recipe Name  */}
              <Text className='text-lg font-semibold'>{recipe.title}</Text>
              {/* Star rating  */}
              <StarRating rating={recipe.rating} reviews={recipe.reviews} />
            </View>
            {/* FODMAP level list view */}
            {!isGridView && (
              <View>
                <Text className='bg-fodmap-low text-green-50 px-2 py-1 rounded-lg font-semibold'>{recipe.level}</Text>
              </View>
            )}
          </View>
          <View className='flex-row justify-between'>
            {/* Cooking time  */}
            <View className='flex-row items-center gap-1 opacity-65'>
              <AntDesignIcon name='clockcircleo' size={14} />
              <Text>{recipe.total_time}m</Text>
            </View>
            {/* Category  */}
            <Text className='bg-cyan-100 text-cyan-900 px-2 py-1 rounded-lg'>{recipe.category}</Text>
          </View>
          {/* Dietary needs  */}
          <View className='flex-row flex-wrap gap-2'>
            {recipe.dietary_needs?.map((need, index) => (
              <Text key={index} className='bg-blue-50 text-blue-900 px-2 py-1 rounded-lg'>
                {need}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <RecipeDetails ref={actionSheetRef} recipe={recipe} />
    </TouchableOpacity>
  );
}
