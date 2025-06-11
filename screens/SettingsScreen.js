import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/shared/Header";
import SettingItem from "../components/settings/SettingItem";
import SectionHeader from "../components/shared/SectionHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../context/AuthContext";
import {
  clearUserData,
  deleteUserAccount as deleteAccountService,
} from "../services/dataManagement";

const SettingsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const {
      data: { user },
    } = await import("../utils/supabase").then((m) =>
      m.supabase.auth.getUser()
    );
    setUser(user);
  };

  const showClearDataOptions = () => {
    Alert.alert(
      "Clear Data",
      "What would you like to clear?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Symptom Entries",
          onPress: () => confirmClearData("symptoms"),
        },
        {
          text: "Saved Recipes",
          onPress: () => confirmClearData("saved_recipes"),
        },
        {
          text: "All Data",
          onPress: () => confirmClearData("all"),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const confirmClearData = (dataType) => {
    const dataTypeText = {
      symptoms: "symptom entries",
      saved_recipes: "saved recipes",
      all: "all your data",
    };

    Alert.alert(
      "Confirm Clear Data",
      `Are you sure you want to clear ${dataTypeText[dataType]}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearData(dataType),
        },
      ]
    );
  };

  const clearData = async (dataType) => {
    if (!user) return;
    setIsLoading(true);
    try {
      await clearUserData(user.id, dataType);
      Alert.alert("Success", "Data cleared successfully.");
    } catch (error) {
      console.error("Error clearing data:", error);
      Alert.alert("Error", "Failed to clear data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This will permanently delete all your data and cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: deleteAccount,
        },
      ]
    );
  };

  const deleteAccount = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await deleteAccountService(user.id);
      logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        onPress: async () => {
          logout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-surface-secondary">
      <Header
        title="Settings"
        showBack
        onBackPress={() => navigation.goBack()}
        showProfile={false}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 px-6 py-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Data Management Section */}
          <View className="mb-8">
            <SectionHeader title="Data Management" />
            <View className="bg-surface-primary rounded-2xl shadow-sm border border-border-light overflow-hidden">
              <SettingItem
                icon="trash-outline"
                title="Clear Data"
                subtitle="Remove specific data from your account"
                onPress={showClearDataOptions}
                iconColor="#f59e0b"
                iconBgColor="bg-amber-100"
              />
            </View>
          </View>

          {/* Account Section */}
          <View className="mb-4">
            <SectionHeader title="Account" />

            {/* Sign Out */}
            <View className="bg-surface-primary rounded-2xl shadow-sm border border-border-light overflow-hidden mb-4">
              <SettingItem
                icon="log-out-outline"
                title="Sign Out"
                subtitle="Sign out of your account"
                onPress={signOut}
                iconColor="#64748b"
                iconBgColor="bg-slate-100"
              />
            </View>

            {/* Delete Account */}
            <View className="bg-surface-primary rounded-2xl shadow-sm border border-red-200 overflow-hidden">
              <TouchableOpacity
                className="flex-row items-center justify-between py-5 px-3"
                onPress={confirmDeleteAccount}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 rounded-xl bg-red-100 items-center justify-center mr-4">
                    <Ionicons name="trash" size={24} color="#ef4444" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-red-600 mb-1">
                      Delete Account
                    </Text>
                    <Text className="text-sm text-red-500">
                      Permanently delete your account and all data
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Loading Overlay */}
        {isLoading && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-surface-primary rounded-2xl p-8 mx-8 shadow-2xl">
              <Text className="text-lg font-semibold text-gray-900 text-center">
                Processing...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
