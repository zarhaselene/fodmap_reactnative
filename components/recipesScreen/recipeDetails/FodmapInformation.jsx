import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FodmapInformation({ recipeTips }) {
  return (
    <View className='relative flex-row bg-blue-50 rounded-lg my-6 border-blue-200 border'>
      <MaterialCommunityIcons
        className='absolute top-6 left-4'
        size={24}
        color={'#1e3a8a'}
        name='information-outline'
      />
      <View className='gap-4 px-14 py-6'>
        <Text className='text-blue-900 font-bold text-xl'>FODMAP Information</Text>
        {recipeTips.map((tip, index) => (
          <Text className='text-blue-900' key={index}>
            • {tip.tip}
          </Text>
        ))}
      </View>
    </View>
  );
}
