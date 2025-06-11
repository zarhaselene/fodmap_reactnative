import { View, Text, ActivityIndicator } from "react-native";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#14B8A6" />

      <Text className="mt-4 text-text-muted">{message}</Text>
    </View>
  );
};

export default LoadingSpinner;
