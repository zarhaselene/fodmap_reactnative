import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/shared/Header";
import { getUserData, updateUserData } from "../services/getUserData";
import { getUserSavedRecipesCount } from "../services/getUserSavedRecipesData";

import { supabase } from "../utils/supabase";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [savedRe, setNumberOfSavedRecipes] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await getUserData(user.id);
        if (data) {
          setUser(data);
          setName(data.name);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await getUserData(user.id);
        if (data) {
          setUser(data);
          setName(data.name);
        }
        const { count } = await getUserSavedRecipesCount(user.id);
        setNumberOfSavedRecipes(count || 0);
      }
    };
    fetchUser();
  }, []);

  const handleEdit = () => {
    setNewName(name);
    setEditModalVisible(true);
  };

  const handleSave = async () => {
    if (!newName.trim()) {
      Alert.alert("Name cannot be empty");
      return;
    }
    const { error } = await updateUserData(user.id, { name: newName });
    if (error) {
      Alert.alert("Error updating name", error.message);
    } else {
      setName(newName);
      setEditModalVisible(false);
    }
  };

  const ActionItem = ({
    iconName,
    title,
    subtitle,
    onPress,
    iconBg,
    iconColor,
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between w-full py-6 px-4 bg-surface-secondary rounded-lg mb-3 shadow-card"
      activeOpacity={0.85}
    >
      <View className="flex-row items-center">
        <View
          className={`w-12 h-12 rounded-sm flex items-center justify-center mr-3 ${iconBg}`}
        >
          <Ionicons name={iconName} size={25} color={iconColor} />
        </View>
        <View>
          <Text className="font-semibold text-text-primary">{title}</Text>
          {subtitle && (
            <Text className="text-xs text-text-muted">{subtitle}</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-surface-secondary">
      <Header
        title="Profile"
        showSettings={true}
        onSettingsPress={() => navigation.navigate("Settings")}
      />

      <View className="flex-1 px-4 mt-8">
        {/* User Profile Card */}
        <View className="bg-surface-primary rounded-xl p-6 shadow-card mb-8">
          <View className="flex-row items-center">
            <View className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-5 border-2 border-primary shadow-card-lg">
              <Text className="text-4xl font-bold text-primary">
                {name ? name.charAt(0).toUpperCase() : ""}
              </Text>
            </View>
            <View className="flex-1">
              {editModalVisible ? (
                <>
                  <TextInput
                    value={newName}
                    onChangeText={setNewName}
                    className="border border-primary rounded-lg px-4 py-2 text-xl font-semibold text-text-primary bg-surface-secondary w-full mb-3"
                    placeholder="Enter your name"
                    autoFocus
                    maxLength={32}
                  />
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={handleSave}
                      className="flex-1 px-3 py-2 bg-primary rounded-lg items-center"
                    >
                      <Text className="text-white font-semibold">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setEditModalVisible(false)}
                      className="flex-1 px-3 py-2 bg-border-light rounded-lg items-center"
                    >
                      <Text className="text-text-muted font-semibold">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View className="flex-row justify-between items-center">
                  <Text className="text-2xl font-bold text-text-primary">
                    {name || "Loading..."}
                  </Text>
                  <TouchableOpacity
                    onPress={handleEdit}
                    className="ml-3 px-3 py-1 bg-primary/10 rounded-sm"
                  >
                    <Text className="text-primary text-base font-semibold">
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Quick Action
          </Text>
          <ActionItem
            iconName="add"
            title="Log Symptoms"
            subtitle="Track today's progress"
            onPress={() => navigation.navigate("LogSymptoms")}
            iconBg="bg-purple-100"
            iconColor="#8b5cf6"
          />
        </View>

        {/* Account */}
        <View className="mb-24">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Account
          </Text>
          <ActionItem
            iconName="heart"
            title="Saved Recipes"
            subtitle={`${savedRe} recipes`}
            onPress={() => navigation.navigate("SavedRecipes")}
            iconBg="bg-gray-100"
            iconColor="#6b7280"
          />
          <ActionItem
            iconName="book"
            title="FODMAP Resources"
            subtitle="Guides & educational content"
            onPress={() => navigation.navigate("Resources")}
            iconBg="bg-gray-100"
            iconColor="#6b7280"
          />
          <ActionItem
            iconName="settings"
            title="Settings"
            subtitle="App preferences"
            onPress={() => navigation.navigate("Settings")}
            iconBg="bg-gray-100"
            iconColor="#6b7280"
          />
        </View>
      </View>
    </View>
  );
}
