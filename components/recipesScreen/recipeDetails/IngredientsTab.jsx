import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IngredientsTab({ recipe, recipeIngredients, recipeId }) {
  const [useMetric, setUseMetric] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  // Load checked ingredients on component mount
  useEffect(() => {
    loadCheckedIngredients();
  }, [recipeId]);

  async function loadCheckedIngredients() {
    try {
      const stored = await AsyncStorage.getItem(`checked_ingredients_${recipeId}`);
      if (stored) {
        setCheckedIngredients(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.error('Error loading checked ingredients:', error);
    }
  }

  async function saveCheckedIngredients(newSet) {
    try {
      await AsyncStorage.setItem(`checked_ingredients_${recipeId}`, JSON.stringify(Array.from(newSet)));
    } catch (error) {
      console.error('Error saving checked ingredients:', error);
    }
  }

  function handleIngredientToggle(orderIndex) {
    setCheckedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderIndex)) {
        newSet.delete(orderIndex);
      } else {
        newSet.add(orderIndex);
      }
      saveCheckedIngredients(newSet);
      return newSet;
    });
  }

  function handleUnitSystemToggle() {
    setUseMetric((prev) => !prev);
  }

  function handleSizeDecrease() {
    console.log('Decrease pressed!');
  }

  function handleSizeIncrease() {
    console.log('Increase pressed!');
  }

  // Filter ingredients by measurement system and sort by order_index
  const filteredIngredients = recipeIngredients
    .filter((ingredient) => ingredient.measurement_system === (useMetric ? 'eu' : 'us'))
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <View>
      {/* Heading and unit tester */}
      <View className='flex-row  justify-between mb-2'>
        <Text className='text-xl font-semibold'>Ingredients</Text>
        <TouchableOpacity
          onPress={handleUnitSystemToggle}
          className='gap-1 flex-row items-center bg-surface-tertiary px-3 py-2 rounded-sm'
        >
          <MaterialCommunityIcons name='web' size={18} color={'#525252'} />
          <Text className='text-text-secondary'>{useMetric ? 'Imperial' : 'Metric'}</Text>
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
                  isChecked ? 'bg-primary border-primary' : 'border-border-dark'
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
