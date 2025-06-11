import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

const ToggleGridButton = ({ onPress, isGridView }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row gap-2 bg-neutral-100 p-1 rounded-lg"
    >
      <MaterialCommunityIcon
        name="grid"
        size={16}
        color={isGridView ? "#09978A" : "inherit"}
        className={`${
          isGridView ? "bg-surface-primary opacity-70" : "opacity-30"
        } p-2 rounded-lg shadow-sm shadow-neutral-300`}
      />
      <MaterialCommunityIcon
        name="format-list-bulleted"
        size={16}
        color={isGridView ? "inherit" : "#09978A"}
        className={`${
          isGridView ? "opacity-30" : "bg-surface-primary opacity-70"
        } p-2 rounded-lg shadow-sm shadow-neutral-300`}
      />
    </TouchableOpacity>
  );
};

export default ToggleGridButton;
