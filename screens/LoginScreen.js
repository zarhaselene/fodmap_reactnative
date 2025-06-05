import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    // Check if user exists
    const { data: userExists } = await fetchUserByEmail("id");
    if (!userExists) {
      showAlert("Login failed", "User not found");
      return;
    }

    // Try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const msg = error.message?.toLowerCase() || "";
      if (
        msg.includes("invalid login credentials") ||
        msg.includes("missing email or phone")
      ) {
        showAlert("Login failed", "Wrong password");
      } else {
        showAlert("Login failed", error.message);
      }
      return;
    }

    // Fetch full user data and set in context
    const { data: userData } = await fetchUserByEmail("id, name, email");
    if (userData) {
      login(userData);
    }

    navigation.replace("Main");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-2xl font-bold mb-6">Login</Text>
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
        className="bg-teal-600 py-3 px-4 rounded mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-bold">LOGIN</Text>
      </TouchableOpacity>
      <Text
        className="mt-4 text-blue-500"
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}
