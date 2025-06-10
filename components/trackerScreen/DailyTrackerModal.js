import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createTrackerEntry,
  updateTrackerEntry,
  getTrackerEntryByDate,
} from "../../services/trackerData";

const DailyTrackerModal = ({ visible, onClose, userId }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingEntry, setExistingEntry] = useState(null);

  const moods = [
    { label: "Very Poor", emoji: "😞", value: "Very Poor" },
    { label: "Poor", emoji: "😕", value: "Poor" },
    { label: "Okay", emoji: "😐", value: "Okay" },
    { label: "Good", emoji: "😊", value: "Good" },
    { label: "Excellent", emoji: "😄", value: "Excellent" },
  ];

  const symptoms = [
    {
      label: "Bloating",
      icon: "balloon-outline",
      value: "Bloating",
      color: "#ef4444",
    },
    { label: "Gas", icon: "cloud-outline", value: "Gas", color: "#6b7280" },
    {
      label: "Stomach Pain",
      icon: "medical-outline",
      value: "Stomach Pain",
      color: "#f59e0b",
    },
    {
      label: "Diarrhea",
      icon: "water-outline",
      value: "Diarrhea",
      color: "#3b82f6",
    },
    {
      label: "Constipation",
      icon: "stop-circle-outline",
      value: "Constipation",
      color: "#ef4444",
    },
    { label: "Nausea", icon: "sad-outline", value: "Nausea", color: "#84cc16" },
    {
      label: "Fatigue",
      icon: "battery-dead-outline",
      value: "Fatigue",
      color: "#f59e0b",
    },
    {
      label: "Headache",
      icon: "bandage-outline",
      value: "Headache",
      color: "#f59e0b",
    },
  ];

  useEffect(() => {
    if (visible) {
      if (!selectedDate) {
        const today = new Date().toISOString().split("T")[0];
        setSelectedDate(today);
        checkExistingEntry(today);
      } else {
        checkExistingEntry(selectedDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, userId]);

  const resetForm = () => {
    setSelectedMood("");
    setSelectedSymptoms([]);
    setNotes("");
    setExistingEntry(null);
  };

  const checkExistingEntry = async (date) => {
    if (!userId || !date) return;

    try {
      const { data, error } = await getTrackerEntryByDate(userId, date);
      if (!error && data) {
        setExistingEntry(data);
        setSelectedMood(data.mood || "");
        setSelectedSymptoms(data.symptoms || []);
        setNotes(data.notes || "");
      } else {
        setExistingEntry(null);
        setSelectedMood("");
        setSelectedSymptoms([]);
        setNotes("");
      }
    } catch (error) {
      console.error("Error checking existing entry:", error);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(selectedMood === mood ? "" : mood);
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert("Required Field", "Please select your mood for today.");
      return;
    }

    setLoading(true);
    try {
      const entryData = {
        date: selectedDate,
        mood: selectedMood,
        symptoms: selectedSymptoms,
        notes: notes.trim() || null,
      };

      let result;
      if (existingEntry) {
        result = await updateTrackerEntry(existingEntry.id, userId, entryData);
      } else {
        result = await createTrackerEntry(userId, entryData);
      }

      if (result.error) {
        Alert.alert("Error", "Failed to save entry. Please try again.");
        console.error("Save error:", result.error);
      } else {
        Alert.alert(
          "Success",
          existingEntry
            ? "Entry updated successfully!"
            : "Entry saved successfully!",
          [{ text: "OK", onPress: onClose }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const changeDate = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);

    const newDateString = newDate.toISOString().split("T")[0];
    setSelectedDate(newDateString);
    checkExistingEntry(newDateString);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="bg-teal-500 px-4 pt-12 pb-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="items-center">
              <Text className="text-white text-lg font-semibold">
                Daily Tracker
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSave}
              disabled={loading || !selectedMood}
              className="flex-row items-center"
            >
              <Text
                className={`text-white font-medium ${
                  !selectedMood || loading ? "opacity-50" : ""
                }`}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Date Section */}
          <View className="px-4 py-4 border-b border-gray-100">
            <Text className="text-gray-700 font-medium mb-2">Date</Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-gray-900 text-lg font-medium">
                  {formatDateForDisplay(selectedDate)}
                </Text>
              </View>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => changeDate(-1)}
                  className="p-2"
                >
                  <Ionicons name="chevron-back" size={20} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeDate(1)}
                  disabled={
                    selectedDate >= new Date().toISOString().split("T")[0]
                  }
                  className="p-2"
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={
                      selectedDate >= new Date().toISOString().split("T")[0]
                        ? "#d1d5db"
                        : "#6b7280"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Mood Selection */}
          <View className="px-4 py-6">
            <Text className="text-gray-900 text-lg font-medium mb-4">
              How are you feeling today?
            </Text>
            <View className="flex-row justify-between mb-4">
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  onPress={() => handleMoodSelect(mood.value)}
                  className={`items-center p-3 rounded-xl ${
                    selectedMood === mood.value ? "bg-orange-50" : "bg-gray-50"
                  }`}
                  style={{ flex: 1, marginHorizontal: 2 }}
                >
                  <Text className="text-2xl mb-1">{mood.emoji}</Text>
                  <Text
                    className={`text-xs text-center ${
                      selectedMood === mood.value
                        ? "text-orange-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedMood && (
              <View className="items-center">
                <View className="bg-orange-50 px-4 py-5 rounded-sm  flex-row items-center w-full flex justify-center">
                  <Text className="text-orange-800 font-medium text-md">
                    {moods.find((mood) => mood.value === selectedMood)?.emoji}
                    {selectedMood}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Symptoms Selection */}
          <View className="px-4 pb-6">
            <Text className="text-gray-900 text-lg font-medium mb-2">
              Symptoms
            </Text>
            <Text className="text-gray-600 text-sm mb-4">
              Select any symptoms you're experiencing today.
            </Text>
            <View className="flex-row flex-wrap">
              {symptoms.map((symptom, index) => {
                const isSelected = selectedSymptoms.includes(symptom.value);
                return (
                  <TouchableOpacity
                    key={symptom.value}
                    onPress={() => handleSymptomToggle(symptom.value)}
                    className={`flex-row items-center px-3 py-4 rounded-md mr-2 mb-2 border ${
                      isSelected
                        ? "bg-red-50 border-red-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    style={{
                      minWidth:
                        symptoms.length % 2 === 0 &&
                        index >= symptoms.length - 2
                          ? "48%"
                          : "auto",
                    }}
                  >
                    <View
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: isSelected ? symptom.color : "#d1d5db",
                      }}
                    />
                    <Text
                      className={`text-sm ${
                        isSelected
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {symptom.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Notes */}
          <View className="px-4 pb-6">
            <Text className="text-gray-900 text-lg font-medium mb-4">
              Notes (Optional)
            </Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Add any additional notes about your day..."
              multiline
              numberOfLines={4}
              className="bg-gray-50 p-4 rounded-md text-gray-800 border border-gray-200"
              style={{ textAlignVertical: "top" }}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <View className="px-4 pb-7 pt-5 border-t border-gray-100">
          <TouchableOpacity
            onPress={handleSave}
            disabled={loading || !selectedMood}
            className={`py-4 rounded-md items-center ${
              !selectedMood || loading ? "bg-gray-300" : "bg-teal-500"
            }`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Save entry
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DailyTrackerModal;
