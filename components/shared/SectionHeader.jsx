import { Text } from "react-native";

export default function SectionHeader({ title }) {
  return (
    <Text className="text-lg font-semibold text-text-primary mb-3">
      {title}
    </Text>
  );
}
