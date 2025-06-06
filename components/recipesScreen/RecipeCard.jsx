import { View, Text } from 'react-native';
import { Image } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function RecipeCard({ recipe, isGridView }) {
  console.log(recipe);

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

  return (
    <View className={`${isGridView ? 'w-1/2' : 'w-full'}`}>
      <View className={`${isGridView ? 'flex-col' : 'flex-row'} bg-white m-2 rounded-lg`}>
        {/* Recipe image  */}
        <Image
          source={{ uri: recipe.image_url || 'https://via.placeholder.com/300x200' }}
          className={`${isGridView ? 'h-[200px]' : 'w-1/3'} bg-neutral-500`}
          resizeMode='cover'
        />
        <View className='p-4'>
          <View className='flex-row'>
            <View className='flex-1'>
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
            {/* FODMAP level  */}
            <View className='flex-1'>
              <Text>{recipe.level}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
