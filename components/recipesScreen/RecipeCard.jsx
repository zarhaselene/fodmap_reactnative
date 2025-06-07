import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function RecipeCard({ recipe, isGridView }) {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add filled star
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesignIcon key={`full-${i}`} name='star' color={'gold'} size={14} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<AntDesignIcon key='half' name='star' color={'gold'} size={14} style={{ opacity: 0.5 }} />);
    }

    // Add empty stars to make total of 5
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<AntDesignIcon key={`empty-${i}`} name='staro' size={14} style={{ opacity: 0.1 }} />);
    }

    return stars;
  };

  function handlePress() {
    console.log(recipe.title, 'pressed!');
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${isGridView ? 'w-1/2' : 'w-full'} shadow-sm shadow-neutral-300`}
    >
      <View className={`${isGridView ? 'flex-col' : 'flex-row'} relative bg-white m-2 rounded-lg`}>
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
            <Text className='absolute bottom-2 left-2 bg-green-500 text-green-50 px-2 py-1 rounded-lg font-semibold'>
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
              <View className='flex-row gap-1'>
                <View className='flex-row'>{renderStars(recipe.rating)}</View>
                <Text>
                  {recipe.rating.toFixed(1)} ({recipe.reviews})
                </Text>
              </View>
            </View>
            {/* FODMAP level list view */}
            {!isGridView && (
              <View>
                <Text className='bg-green-500 text-green-50 px-2 py-1 rounded-lg font-semibold'>{recipe.level}</Text>
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
    </TouchableOpacity>
  );
}
