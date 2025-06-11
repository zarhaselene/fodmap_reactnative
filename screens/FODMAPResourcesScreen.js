import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/shared/Header";

const FODMAPResourcesScreen = ({ navigation }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      id: "basics",
      title: "FODMAP Basics",
      icon: "book-outline",
      color: "bg-blue-100 ",
      iconColor: "#2563eb",
      resources: [
        "What are FODMAPs?",
        "How FODMAPs affect digestion",
        "The science behind IBS",
        "Getting started checklist",
      ],
    },
    {
      id: "foods",
      title: "Food Lists & Charts",
      icon: "list-outline",
      color: "bg-green-100 ",
      iconColor: "#16a34a",
      resources: [
        "Complete FODMAP food list",
        "High vs Low FODMAP foods",
        "Portion size guide",
        "Seasonal produce guide",
        "International cuisine guide",
      ],
    },
    {
      id: "recipes",
      title: "Recipe Collections",
      icon: "restaurant-outline",
      color: "bg-orange-100",
      iconColor: "#ea580c",
      resources: [
        "Breakfast recipes",
        "Lunch & dinner ideas",
        "Snacks & desserts",
        "Meal prep recipes",
        "Holiday & special occasion",
      ],
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Tips",
      icon: "heart-outline",
      color: "bg-pink-100",
      iconColor: "#ec4899",
      resources: [
        "Travel tips",
        "Social eating strategies",
        "Stress management",
        "Exercise guidelines",
        "Sleep & IBS connection",
      ],
    },
  ];

  const CategorySection = ({ category }) => {
    const isExpanded = expandedCategory === category.id;

    return (
      <View className="mb-4">
        <TouchableOpacity
          className="bg-surface-primary rounded-2xl shadow-sm border border-border-light overflow-hidden"
          onPress={() => setExpandedCategory(isExpanded ? null : category.id)}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-between p-5">
            <View className="flex-row items-center flex-1">
              <View
                className={`w-12 h-12 rounded-xl ${category.color} items-center justify-center mr-4`}
              >
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={category.iconColor}
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 mb-1">
                  {category.title}
                </Text>
                <Text className="text-sm text-text-muted">
                  {category.resources.length} resources available
                </Text>
              </View>
            </View>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={20}
              color="#9ca3af"
            />
          </View>

          {isExpanded && (
            <View className="border-t border-border-light px-5 py-4">
              {category.resources.map((resource, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center justify-between py-3 border-b border-gray-50 last:border-b-0"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-2 h-2 bg-teal-500 rounded-full mr-3" />
                    <Text className="text-text-secondary flex-1">
                      {resource}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-bg-secondary">
      <Header
        title="FODMAP Resources"
        showBack
        onBackPress={() => navigation.goBack()}
        showProfile={false}
      />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header Section */}
          <View className="py-3 mt-8 w-full bg-surface-secondary rounded-lg mb-3 shadow-card">
            <View className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-6">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Your FODMAP Journey
              </Text>
              <Text className="text-gray-900 text-base leading-6">
                Access comprehensive guides, food lists, and expert tips to
                manage your IBS symptoms effectively.
              </Text>
            </View>
          </View>

          {/* Resource Categories */}
          <View className="mt-3">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Browse by Category
            </Text>
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FODMAPResourcesScreen;
