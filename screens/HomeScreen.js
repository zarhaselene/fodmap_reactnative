import { View, ScrollView } from "react-native";
import Header from "../components/Header";
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

  return (
    <View className="flex-1">
      <Header title="FODMAP Helper" showLogout onLogoutPress={handleLogout} />
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
          onPressSymptoms={() => navigation.navigate("SymptomTracker")}
        />
        <FeaturedRecipes
          onPressRecipe={(recipe) =>
            navigation.navigate("RecipeDetail", { recipe })
          }
          onPressSeeAll={() => navigation.navigate("AllRecipes")}
        />
      </ScrollView>
    </View>
  );
}
