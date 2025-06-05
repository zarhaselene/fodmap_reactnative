import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Login failed", error.message);
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
            .insert([{ id: user.id, email: user.email }]);
        }
      }
      navigation.replace("Main");
    }
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
