import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Header = ({
  title,
  showBack,
  showSave,
  showSearch,
  showSettings,
  showProfile,
  showLogout,
  onBackPress,
  onSavePress,
  onSearchPress,
  onSettingsPress,
  onProfilePress,
  onLogoutPress,
}) => {
  const navigation = useNavigation();

  return (
    <View className="bg-teal-600 px-4 pt-4 pb-4">
      <SafeAreaView>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {showBack ? (
              <TouchableOpacity
                onPress={onBackPress || (() => navigation.goBack())}
                className="mr-2"
              >
                <Icon name="arrow-left" size={24} color="#fff" />
              </TouchableOpacity>
            ) : null}
            <View>
              <Text className="text-white text-lg font-bold">{title}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            {showSearch && (
              <TouchableOpacity onPress={onSearchPress} className="mr-2">
                <Icon name="magnify" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            {showSettings && (
              <TouchableOpacity onPress={onSettingsPress} className="mr-2">
                <Icon name="cog-outline" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            {showLogout && (
              <TouchableOpacity onPress={onLogoutPress} className="mr-2">
                <Icon name="logout" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            {showProfile && (
              <TouchableOpacity
                onPress={onProfilePress}
                className="bg-teal-500 rounded-full p-2"
              >
                <Icon name="account" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
