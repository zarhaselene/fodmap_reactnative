import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { getTrackerOverview, getTrackerEntries } from "../services/trackerData";
import Header from "../components/shared/Header";
import DailyTrackerModal from "../components/trackerScreen/DailyTrackerModal";

const TrackerScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [overview, setOverview] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle logout and navigation
  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };
  const fetchTrackerData = async () => {
    if (!user?.id) return;

    try {
      const [overviewResult, entriesResult] = await Promise.all([
        getTrackerOverview(user.id, 7),
        getTrackerEntries(user.id, 10),
      ]);

      if (!overviewResult.error) {
        setOverview(overviewResult.data);
      }

      if (!entriesResult.error) {
        setRecentEntries(entriesResult.data || []);
      }
    } catch (error) {
      console.error("Error fetching tracker data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrackerData();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrackerData();
  };

  const handleAddEntry = () => {
    setSelectedDate(null);
    setModalVisible(true);
  };

  const handleEditEntry = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedDate(null);
    fetchTrackerData();
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      "Very Poor": "😞",
      Poor: "😕",
      Okay: "😐",
      Good: "😊",
      Excellent: "😄",
    };
    return moodEmojis[mood] || "😐";
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      "Very Poor": "#ef4444",
      Poor: "#f97316",
      Okay: "#f59e0b",
      Good: "#84cc16",
      Excellent: "#10b981",
    };
    return moodColors[mood] || "#9ca3af";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-bg-secondary">
        <Header title="Daily Tracker" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#14b8a6" />
        </View>
      </View>
    );
  }

  if (!user?.id && !loading) {
    return (
      <View className="flex-1 bg-bg-secondary">
        <Header
          title="Daily Tracker"
          showLogout
          onLogoutPress={handleLogout}
          showProfile
          onProfilePress={() => navigation.navigate("Profile")}
        />

        <View className="flex-1 bg-bg-secondary justify-center items-center">
          <Text className="text-text-muted">
            You must be logged in to use the tracker.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg-secondary">
      <Header
        title="Daily Tracker"
        showLogout
        onLogoutPress={handleLogout}
        showProfile
        onProfilePress={() => navigation.navigate("Profile")}
      />

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Overview Cards */}
        <View className="px-4 py-6">
          <View className="flex-row mb-6">
            <View className="flex-1 mr-2">
              <View className="bg-surface-primary p-4 rounded-xl shadow-sm border border-border-light">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="happy-outline" size={20} color="#14b8a6" />
                  <Text className="text-text-darkGray text-sm ml-2">
                    Avg Mood
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-text-primary">
                  {overview?.averageMood || "0.0"}
                </Text>
                <Text className="text-xs text-text-muted">Last 7 days</Text>
              </View>
            </View>

            <View className="flex-1 ml-2">
              <View className="bg-surface-primary p-4 rounded-xl shadow-sm border border-border-light">
                <View className="flex-row items-center mb-2">
                  <Ionicons name="calendar-outline" size={20} color="#14b8a6" />
                  <Text className="text-text-darkGray text-sm ml-2">
                    Entries
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-text-primary">
                  {overview?.totalEntries || 0}
                </Text>
                <Text className="text-xs text-text-muted">Last 7 days</Text>
              </View>
            </View>
          </View>

          {/* Common Symptoms */}
          {overview?.commonSymptoms &&
            Object.keys(overview.commonSymptoms).length > 0 && (
              <View className="bg-surface-primary p-4 rounded-xl shadow-sm border border-border-light mb-6">
                <View className="flex-row items-center mb-3">
                  <Ionicons name="pulse-outline" size={20} color="#14b8a6" />
                  <Text className="text-text-primary text-lg font-semibold ml-2">
                    Common Symptoms
                  </Text>
                </View>
                <View className="flex-row flex-wrap">
                  {Object.entries(overview.commonSymptoms)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([symptom, count]) => (
                      <View
                        key={symptom}
                        className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                      >
                        <Text className="text-text-secondary text-sm">
                          {symptom} ({count})
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            )}

          {/* Recent Entries */}
          <View className="bg-surface-primary rounded-xl shadow-sm border border-border-light mb-6">
            <View className="flex-row items-center justify-between p-4 border-b border-border-light">
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={20} color="#14b8a6" />
                <Text className="text-text-primary text-lg font-semibold ml-2">
                  Recent Entries
                </Text>
              </View>
            </View>

            {recentEntries.length === 0 ? (
              <View className="p-8 items-center">
                <Ionicons name="document-outline" size={48} color="#d1d5db" />
                <Text className="text-text-muted text-center mt-3">
                  No entries yet. Start tracking your daily mood and symptoms!
                </Text>
              </View>
            ) : (
              <View>
                {recentEntries.slice(0, 5).map((entry) => (
                  <TouchableOpacity
                    key={entry.id}
                    onPress={() => handleEditEntry(entry.date)}
                    className="flex-row items-center p-4 border-b border-gray-50 last:border-b-0"
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center flex-1">
                      <Text className="text-2xl mr-3">
                        {getMoodEmoji(entry.mood)}
                      </Text>
                      <View className="flex-1">
                        <View className="flex-row items-center mb-1">
                          <Text className="text-text-primary font-medium">
                            {formatDate(entry.date)}
                          </Text>
                          <View
                            className="w-2 h-2 rounded-full ml-2"
                            style={{
                              backgroundColor: getMoodColor(entry.mood),
                            }}
                          />
                        </View>
                        <Text className="text-text-darkGray text-sm">
                          {entry.mood}
                          {entry.symptoms && entry.symptoms.length > 0 && (
                            <Text> • {entry.symptoms.length} symptoms</Text>
                          )}
                        </Text>
                      </View>
                    </View>
                    {/* Edit icon */}
                    <Ionicons
                      name="create-outline"
                      size={25}
                      color="#14b8a6"
                      style={{ marginLeft: 8 }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Entry Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={handleAddEntry}
          className="bg-teal-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Daily Tracker Modal */}
      <DailyTrackerModal
        visible={modalVisible}
        onClose={handleModalClose}
        userId={user?.id}
        initialDate={selectedDate}
      />
    </View>
  );
};

export default TrackerScreen;
