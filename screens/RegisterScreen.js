import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const showAlert = (title, message) => Alert.alert(title, message);

  const fetchUserByEmail = async (fields = "id, name, email") => {
    const { data, error } = await supabase
      .from("users")
      .select(fields)
      .eq("email", email)
      .single();
    return { data, error };
  };

  const validateInputs = () => {
    if (!name || !email || !password) {
      showAlert("Registration failed", "Please fill in all fields");
      return false;
    }

    if (name.length < 2) {
      showAlert("Registration failed", "Name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Registration failed", "Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      showAlert(
        "Registration failed",
        "Password must be at least 6 characters"
      );
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        showAlert("Registration failed", error.message);
        setLoading(false);
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
    } catch (error) {
      showAlert("Registration failed", "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#4FD1BF", "#1EA79E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 bg-gradient-to-br from-emerald-50 to-teal-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center items-center px-6 py-8">
              {/* Head Section */}
              <View className="items-center mb-8">
                <Text className="text-3xl font-bold text-white tracking-wide">
                  FODMAP
                </Text>
                <Text className="text-white text-sm font-medium ">
                  Friendly Food Finder
                </Text>
              </View>

              {/* Register Card */}
              <View className="w-full max-w-sm bg-white rounded-3xl shadow-md p-8 border border-gray-100">
                <View className="items-center mb-6">
                  <Text className="text-2xl font-bold text-[#1EA79E] mb-2">
                    Create Account
                  </Text>
                  <Text className="text-base text-gray-500 text-center leading-5">
                    Join us to discover FODMAP-friendly recipes
                  </Text>
                </View>

                {/* Input Fields */}
                <View className="space-y-4 mb-6">
                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                      Name
                    </Text>
                    <TextInput
                      className="border border-gray-200 bg-gray-50 w-full p-4 rounded-xl text-base text-gray-800 focus:border-emerald-400"
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor="#9ca3af"
                      editable={!loading}
                    />
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5 ml-1">
                      Email Address
                    </Text>
                    <TextInput
                      className="border border-gray-200 bg-gray-50 w-full p-4 rounded-xl text-base text-gray-800 focus:border-emerald-400"
                      placeholder="Enter your email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={email}
                      onChangeText={setEmail}
                      placeholderTextColor="#9ca3af"
                      editable={!loading}
                    />
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2 mt-5 ml-1">
                      Password
                    </Text>
                    <TextInput
                      className="border border-gray-200 bg-gray-50 w-full p-4 rounded-xl text-base text-gray-800 focus:border-emerald-400"
                      placeholder="Create a password"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      placeholderTextColor="#9ca3af"
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* Password Requirements */}
                <View className="mb-6">
                  <Text className="text-xs text-gray-500 text-center leading-4">
                    Password must be at least 6 characters long
                  </Text>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  className={`py-4 rounded-xl mb-4 shadow-lg ${
                    loading ? "bg-[#4FD1BF]" : "bg-[#1EA79E]"
                  }`}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    {loading ? "Creating Account..." : "Create Account"}
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-px bg-gray-200" />
                  <Text className="mx-4 text-gray-400 text-sm font-medium">
                    or
                  </Text>
                  <View className="flex-1 h-px bg-gray-200" />
                </View>

                {/* Login Link */}
                <TouchableOpacity
                  className="border-2 border-[#1EA79E] py-3 rounded-xl"
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text className="text-[#1EA79E] text-center font-semibold text-base">
                    Sign In to Existing Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
