import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({
  search,
  onSearchChange,
  onFilterPress,
  placeholder = "Search...",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row items-center bg-bg-secondary rounded-lg px-3 py-2 mb-3 w-full border-2 ${
        isFocused ? "border-border-focus" : "border-transparent"
      }`}
    >
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 ml-3 text-gray-900 text-md"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={search}
        onChangeText={onSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
