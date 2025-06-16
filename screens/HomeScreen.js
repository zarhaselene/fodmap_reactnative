import { View, ScrollView } from "react-native";
import Header from "../components/shared/Header";
import WelcomeCard from "../components/home/WelcomeCard";
import FeatureCards from "../components/home/FeatureCards";
import FeaturedRecipes from "../components/home/FeaturedRecipes";

import { useAuth } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  // Handle logout and navigation
  const handleLogout = () => {
    logout();
    navigation.replace("Login");
  };
  // Handle recipe press
  const handleRecipePress = (recipe) => {
    console.log("Recipe pressed:", recipe);
  };

  // Handle see all press
  const handleSeeAllPress = () => {
    navigation.navigate("Recipes");
  };
  return (
    <View className="flex-1">
      <Header
        title="FODMAP Helper"
        showProfile
        onProfilePress={() => navigation.navigate("Profile")}
        showLogout
        onLogoutPress={handleLogout}
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: 24,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard />
        <FeatureCards
          onPressRecipes={() => navigation.navigate("Recipes")}
          onPressFoods={() => navigation.navigate("Foods")}
          onPressSymptoms={() => navigation.navigate("Tracker")}
        />
        <FeaturedRecipes
          onPressRecipe={handleRecipePress}
          onPressSeeAll={handleSeeAllPress}
        />
      </ScrollView>
    </View>
  );
}
