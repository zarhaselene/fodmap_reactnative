import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IngredientsTab({ recipeIngredients }) {
  const [useMetric, setUseMetric] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  function handleUnitSystemToggle() {
    setUseMetric((prev) => !prev);
  }

  function handleIngredientToggle(orderIndex) {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderIndex)) {
        newSet.delete(orderIndex);
      } else {
        newSet.add(orderIndex);
      }
      return newSet;
    });
  }

  // Filter ingredients by measurement system and sort by order_index
  const filteredIngredients = recipeIngredients
    .filter((ingredient) => ingredient.measurement_system === (useMetric ? 'eu' : 'us'))
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <View>
      {/* Heading and unit toggle button  */}
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='text-xl font-semibold'>Ingredients</Text>
        <TouchableOpacity
          onPress={handleUnitSystemToggle}
          className='gap-1 flex-row items-center bg-neutral-100 px-3 py-2 rounded-sm'
        >
          <MaterialCommunityIcons name='web' size={18} color={'#525252'} />
          <Text className='text-neutral-600'>{useMetric ? 'Imperial' : 'Metric'}</Text>
        </TouchableOpacity>
      </View>
      {/* Ingredients list  */}
      <View className='gap-4'>
        {filteredIngredients.map((ingredient) => {
          const isChecked = checkedIngredients.has(ingredient.order_index);
          return (
            <TouchableOpacity
              key={ingredient.order_index}
              onPress={() => handleIngredientToggle(ingredient.order_index)}
              className='flex-row items-center gap-3'
            >
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}
              >
                {isChecked && <MaterialCommunityIcons name='check' size={16} color='white' />}
              </View>
              <Text className={`text-lg flex-1 ${isChecked ? 'line-through opacity-60' : ''}`}>
                {ingredient.ingredient}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
