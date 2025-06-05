import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();

  // Helper for showing alerts
  const showAlert = (title, message) => Alert.alert(title, message);

  // Helper for fetching user by email
  const fetchUserByEmail = async (fields = "id, name, email") => {
    const { data, error } = await supabase
      .from("users")
      .select(fields)
      .eq("email", email)
      .single();
    return { data, error };
  };
  
  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      showAlert("Registration failed", error.message);
      return;
    }

    const user = data.user;
    if (user) {
      // Insert into users table if not exists
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        await supabase
          .from("users")
          .insert([{ id: user.id, email: user.email, name: name }]);
      }

      // Fetch full user data and set in context
      const { data: userData } = await fetchUserByEmail("id, name, email");
      if (userData) {
        login(userData);
      }
    }

    navigation.replace("Main");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <View className="w-full max-w-xs">
        <Text className="text-2xl font-bold mb-6 text-center">Register</Text>
        <TextInput
          className="border w-full mb-4 p-2 rounded"
          placeholder="Name"
          value={name}
          onChangeText={setName}
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
