import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { getRecipes } from '../services/getRecipes';
import RecipeCard from '../components/recipesScreen/RecipeCard';

export default function RecipesScreen({ navigation }) {
  const [isGridView, setIsGridView] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  function handleSearch(text) {
    if (!text.trim()) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title?.toLowerCase().includes(text.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(text.toLowerCase()) ||
        recipe.dietary_needs?.some((need) => need?.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredRecipes(filtered);
  }

  function handleFilter() {
    console.log('Filter pressed!');
  }

  function handleToggleGrid() {
    setIsGridView((prev) => !prev);
  }

  return (
    <View className='flex-1'>
      <Header title='Recipes' />
      <View className='flex-1 items-center'>
        <View className='bg-white p-4 w-full gap-8'>
          <View className='flex-row items-center gap-4'>
            <Search onChangeText={handleSearch} />
            <FilterButton onPress={handleFilter} />
          </View>
          <View className='flex-row items-center justify-between'>
            <Text>{filteredRecipes.length} recipes found</Text>
            <ToggleGridButton onPress={handleToggleGrid} isGridView={isGridView} />
          </View>
        </View>
        <ScrollView>
          {loading ? (
            <Text className='p-4'>Loading recipes...</Text>
          ) : (
            <RecipesList recipes={filteredRecipes} isGridView={isGridView} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

////////////////
// Components //
////////////////

function Search({ onChangeText }) {
  return (
    <View className='bg-neutral-100 h-12 p-2 rounded-lg flex-row items-center gap-2 flex-1'>
      <AntDesignIcon name='search1' size={18} className='opacity-25' />
      <TextInput onChangeText={onChangeText} className='h-full flex-1' placeholder='Search recipes...' />
    </View>
  );
}

function FilterButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='h-12 w-12 rounded-lg border bg-neutral-100 border-neutral-300 justify-center items-center'
    >
      <AntDesignIcon name='filter' size={20} className='opacity-70' />
    </TouchableOpacity>
  );
}

function ToggleGridButton({ onPress, isGridView }) {
  return (
    <TouchableOpacity onPress={onPress} className='flex-row gap-2 bg-neutral-100 p-1 rounded-lg'>
      <MaterialCommunityIcon
        name='grid'
        size={16}
        color={isGridView ? '#09978A' : 'inherit'}
        className={`${isGridView ? 'bg-white opacity-70' : 'opacity-30'} p-2 rounded-lg shadow-sm shadow-neutral-300`}
      />
      <MaterialCommunityIcon
        name='format-list-bulleted'
        size={16}
        color={isGridView ? 'inherit' : '#09978A'}
        className={`${isGridView ? 'opacity-30' : 'bg-white opacity-70'} p-2 rounded-lg shadow-sm shadow-neutral-300`}
      />
    </TouchableOpacity>
  );
}

function RecipesList({ recipes, isGridView }) {
  return (
    <View className='flex-row flex-wrap p-2'>
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={recipe} isGridView={isGridView} key={index} />
      ))}
    </View>
  );
}
