import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({
  search,
  onSearchChange,
  onFilterPress,
  placeholder = "Search...",
}) => {
  return (
    <View className="flex-row items-center bg-gray-50 rounded-lg px-3 py-2 mb-3 w-full">
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-gray-900"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={onSearchChange}
      />
      {search?.length > 0 && (
        <TouchableOpacity
          onPress={() => onSearchChange("")}
          className="ml-1 p-1"
        >
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      )}
      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} className="ml-2 p-1">
          <Icon name="filter-outline" size={22} color="#14B8A6" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
