import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function SettingItem({
  icon,
  iconLibrary = "Ionicons",
  title,
  subtitle,
  onPress,
  rightComponent,
  showChevron = true,
  iconColor = "#14b8a6",
  iconBgColor = "bg-teal-100",
  showBorder = false,
}) {
  const IconComponent =
    iconLibrary === "MaterialCommunityIcons"
      ? MaterialCommunityIcons
      : Ionicons;

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between py-5 px-3 ${
        showBorder ? "border-b border-border-light" : ""
      }`}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View
          className={`w-12 h-12 rounded-xl ${iconBgColor} items-center justify-center mr-4`}
        >
          <IconComponent name={icon} size={24} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-sm text-text-muted">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightComponent ||
        (showChevron && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9ca3af"
          />
        ))}
    </TouchableOpacity>
  );
}
