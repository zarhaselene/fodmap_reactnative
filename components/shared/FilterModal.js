import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterSection = ({
  title,
  options,
  selectedValues,
  onToggle,
  keyField = null,
}) => (
  <>
    <Text className="font-semibold text-gray-900 mb-3 mt-6 first:mt-0">
      {title}
    </Text>
    {options.map((option) => {
      const value = keyField ? option[keyField] : option;
      const label = keyField ? option.label || option[keyField] : option;
      const displayLabel =
        typeof label === "string"
          ? label.charAt(0).toUpperCase() + label.slice(1)
          : label;
      return (
        <TouchableOpacity
          key={value}
          className="flex-row items-center py-2"
          onPress={() => onToggle(value)}
        >
          <Ionicons
            name={
              selectedValues.includes(value) ? "checkbox" : "square-outline"
            }
            size={22}
            color="#14B8A6"
          />
          <Text className="ml-3 text-text-secondary">{displayLabel}</Text>
        </TouchableOpacity>
      );
    })}
  </>
);

const FilterModal = ({ visible, onClose, onResetFilters, filterSections }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="absolute inset-0 bg-black/50" pointerEvents="auto" />
      <View className="flex-1 justify-center items-center">
        <View className="bg-surface-primary rounded-2xl p-6 w-[90%] max-h-[80%] z-10">
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100"
            accessibilityLabel="Close filter modal"
          >
            <Ionicons name="close" size={26} color="#64748b" />
          </TouchableOpacity>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-xl text-gray-900">Filters</Text>
          </View>
          <ScrollView>
            {filterSections.map((section, idx) => (
              <View key={idx} style={{ marginBottom: 12 }}>
                <FilterSection
                  title={section.title}
                  options={section.options}
                  selectedValues={section.selectedValues}
                  onToggle={section.onToggle}
                  keyField={section.keyField}
                />
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={onResetFilters}
            className="mt-6 bg-error rounded-lg py-3 items-center"
          >
            <Text className="text-white font-bold text-base">Reset All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            className="mt-3 bg-brand-primary rounded-lg py-3 items-center"
          >
            <Text className="text-white font-bold text-base">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
