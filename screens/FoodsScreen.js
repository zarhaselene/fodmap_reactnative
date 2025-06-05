import { View, Text } from "react-native";
export default function FoodsScreen() {
  return (
    <View>
      <Header title="Food Database" showProfile onProfilePress={""} />
      <View className="flex-1 justify-center items-center">
        <Text>Food Database</Text>
      </View>
    </View>
  );
}
