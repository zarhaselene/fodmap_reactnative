import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InstructionsTab({ recipeInstructions, recipeId }) {
  const [checkedSteps, setCheckedSteps] = useState(new Set());

  // Load checked steps on component mount
  useEffect(() => {
    loadCheckedSteps();
  }, [recipeId]);

  async function loadCheckedSteps() {
    try {
      const stored = await AsyncStorage.getItem(`checked_steps_${recipeId}`);
      if (stored) {
        setCheckedSteps(new Set(JSON.parse(stored)));
      }
    } catch (error) {
      console.error('Error loading checked steps:', error);
    }
  }

  async function saveCheckedSteps(newSet) {
    try {
      await AsyncStorage.setItem(`checked_steps_${recipeId}`, JSON.stringify(Array.from(newSet)));
    } catch (error) {
      console.error('Error saving checked steps:', error);
    }
  }

  function handleStepToggle(stepNumber) {
    setCheckedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      saveCheckedSteps(newSet);
      return newSet;
    });
  }

  // Sort instructions by step_number
  const sortedInstructions = recipeInstructions.sort((a, b) => a.step_number - b.step_number);

  return (
    <View>
      {/* Progress indicator */}
      {sortedInstructions.length > 0 && (
        <View className=' mb-6'>
          <View className='flex-row justify-between items-center mb-2'>
            <Text className='font-medium text-neutral-700'>Progress</Text>
            <Text className='text-neutral-600'>
              {Math.round((checkedSteps.size / sortedInstructions.length) * 100)}%
            </Text>
          </View>
          <View className='h-2 bg-neutral-200 rounded-full'>
            <View
              className='h-2 bg-primary rounded-full'
              style={{
                width: `${(checkedSteps.size / sortedInstructions.length) * 100}%`,
              }}
            />
          </View>
        </View>
      )}

      {/* Heading */}
      <View className='flex-row items-center justify-between mb-4'>
        <Text className='text-xl font-semibold'>Instructions</Text>
      </View>

      {/* Instructions list */}
      <View className='gap-4'>
        {sortedInstructions.map((instruction) => {
          const isChecked = checkedSteps.has(instruction.step_number);
          return (
            <TouchableOpacity
              key={instruction.step_number}
              onPress={() => handleStepToggle(instruction.step_number)}
              className='flex-row gap-3'
            >
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center mt-1 ${
                  isChecked ? 'bg-primary border-primary' : 'border-gray-300'
                }`}
              >
                {isChecked && <MaterialCommunityIcons name='check' size={16} color='white' />}
              </View>

              <View className='flex-1'>
                <Text className={`text-lg leading-6 ${isChecked ? 'line-through opacity-60' : ''}`}>
                  {instruction.instruction}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
