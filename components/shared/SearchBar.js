import { View, TextInput } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const SearchBar = ({ onChangeText }) => {
  return (
    <View className="bg-neutral-100 h-12 p-2 rounded-lg flex-row items-center gap-2 flex-1">
      <AntDesignIcon name="search1" size={18} className="opacity-25" />
      <TextInput
        onChangeText={onChangeText}
        className="h-full flex-1"
        placeholder="Search recipes..."
      />
    </View>
  );
};

export default SearchBar;
