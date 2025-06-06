import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../context/AuthContext";

const WelcomeCard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");

  // Get greeting based on time
  const getTimeBasedGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  // Get message based on time
  const getContextualMessage = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 5 && hour < 9) {
      return "Ready to start your day with FODMAP-friendly breakfast?";
    } else if (hour >= 9 && hour < 12) {
      return "Planning a healthy mid-morning snack?";
    } else if (hour >= 12 && hour < 14) {
      return "Time for a delicious FODMAP-friendly lunch!";
    } else if (hour >= 14 && hour < 17) {
      return "Looking for an afternoon pick-me-up?";
    } else if (hour >= 17 && hour < 20) {
      return "Ready to explore FODMAP-friendly dinner recipes?";
    } else if (hour >= 20 && hour < 22) {
      return "Planning tomorrow's meals?";
    } else {
      return "Having trouble sleeping? Check your evening foods.";
    }
  };

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getTimeBasedGreeting());
    };
    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <LinearGradient
        colors={["#4FD1BF", "#1EA79E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 20,
          marginHorizontal: 16,
          marginBottom: 24,
          padding: 20,
        }}
      >
        <Text className="text-white text-xl font-bold mb-2">
          {greeting}, {user?.name || "Guest"}!
        </Text>
        <Text className="text-white/90 text-base">
          {getContextualMessage()}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default WelcomeCard;
