import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert("Registration failed", error.message);
    } else {
      const user = data.user;
      if (user) {
        const { data: existing, error: selectError } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!existing) {
          await supabase
            .from("users")
            .insert([{ id: user.id, email: user.email, full_name: fullName }]);
        }
      }
      navigation.replace("Main");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <View className="w-full max-w-xs">
        <Text className="text-2xl font-bold mb-6 text-center">Register</Text>
        <TextInput
          className="border w-full mb-4 p-2 rounded"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          className="border w-full mb-4 p-2 rounded"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border w-full mb-6 p-2 rounded"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-teal-600 py-3 rounded mb-4"
          onPress={handleRegister}
        >
          <Text className="text-white text-center font-bold">REGISTER</Text>
        </TouchableOpacity>
        <Text
          className="mt-4 text-blue-500 text-center"
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
}
