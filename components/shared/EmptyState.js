import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EmptyState = ({
  type = "search",
  icon,
  title,
  description,
  children,
}) => {
  const states = {
    search: {
      icon: "search",
      title: "No items found",
      description: "Try adjusting your search or filters",
    },
    loading: {
      icon: "hourglass",
      title: "Loading...",
      description: "Please wait while we fetch the data",
    },
    error: {
      icon: "alert-circle",
      title: "Something went wrong",
      description: "Please try again later",
    },
    custom: {
      icon: "information-circle",
      title: "",
      description: "",
    },
  };

  const state = states[type] || states.custom;

  return (
    <View className="flex-1 justify-center items-center py-12">
      <Ionicons name={icon || state.icon} size={48} color="#D1D5DB" />
      <Text className="text-text-gray text-center mt-4 text-lg">
        {title || state.title}
      </Text>
      <Text className="text-gray-300 text-center mt-2">
        {description || state.description}
      </Text>
      {children}
    </View>
  );
};

export default EmptyState;

// Examples
{
  /* <EmptyState
  icon="star"
  title="No favorites yet"
  description="Mark recipes or foods as favorites to see them here."
/> 

// For error
<EmptyState type="error" />

// For loading
<EmptyState type="loading" />

// For recipes:

<EmptyState
  icon="book-outline"
  title="No recipes found"
  description="Try searching for something else or add a new recipe."
/>
*/
}
