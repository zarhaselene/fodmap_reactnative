import { View, Text } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const StarRating = ({ rating, reviews }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add filled stars
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
    stars.push(<AntDesignIcon key={`empty-${i}`} name='staro' size={14} style={{ opacity: 0.3 }} />);
  }

  return (
    <View className='flex-row gap-2 items-center'>
      <View className='flex-row'>{stars}</View>
      <Text>
        {rating.toFixed(1)} ({reviews})
      </Text>
    </View>
  );
};

export default StarRating;
