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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Login failed", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Check if user exists
      const { data: userExists } = await fetchUserByEmail("id");
      if (!userExists) {
        showAlert("Login failed", "User not found");
        setLoading(false);
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
        setLoading(false);
        return;
      }

      // Fetch full user data and set in context
      const { data: userData } = await fetchUserByEmail("id, name, email");
      if (userData) {
        login(userData);
      }
      navigation.replace("Main");
    } catch (error) {
      showAlert("Login failed", "An unexpected error occurred");
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
      <SafeAreaView className="flex-1 ">
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
                <Text className="text-white text-sm font-medium mt-1">
                  Friendly Food Finder
                </Text>
              </View>

              {/* Login Card */}
              <View className="w-full max-w-sm bg-surface-primary rounded-3xl shadow-md p-8 border border-border-light">
                <View className="items-center mb-6">
                  <Text className="text-2xl font-bold text-text-brand mb-2">
                    Welcome!
                  </Text>
                  <Text className="text-base text-text-muted text-center leading-5">
                    Log in to explore FODMAP-friendly recipes and meals
                  </Text>
                </View>

                {/* Input Fields */}
                <View className="space-y-4 mb-6">
                  <View>
                    <Text className="text-sm font-semibold text-text-secondary mb-2 ml-1">
                      Email Address
                    </Text>
                    <TextInput
                      className="border border-border bg-bg-secondary w-full p-4 rounded-xl text-base text-text-primary focus:border-border-brand"
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
                    <Text className="text-sm font-semibold text-text-secondary mb-2 mt-2 ml-1">
                      Password
                    </Text>
                    <TextInput
                      className="border border-border bg-bg-secondary w-full p-4 rounded-xl text-base text-text-primary focus:border-border-brand"
                      placeholder="Enter your password"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      placeholderTextColor="#9ca3af"
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  className={`py-4 rounded-xl mb-4 shadow-lg ${
                    loading ? "bg-brand-secondary" : "bg-brand-primary"
                  }`}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    {loading ? "Signing In..." : "Sign In"}
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-px bg-border" />
                  <Text className="mx-4 text-text-gray text-sm font-medium">
                    or
                  </Text>
                  <View className="flex-1 h-px bg-border" />
                </View>

                {/* Register Link */}
                <TouchableOpacity
                  className="border-2 border-border-brand py-3 rounded-xl"
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text className="text-text-brand text-center font-semibold text-base">
                    Create New Account
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
