import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import RecipesScreen from "../screens/RecipesScreen";
import FoodsScreen from "../screens/FoodsScreen";
import TrackerScreen from "../screens/TrackerScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const HomeStack = createNativeStackNavigator();
const RecipesStack = createNativeStackNavigator();
const FoodsStack = createNativeStackNavigator();
const TrackerStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home stack
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}

// Recipes stack
function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator screenOptions={{ headerShown: false }}>
      <RecipesStack.Screen name="RecipesMain" component={RecipesScreen} />
      <RecipesStack.Screen name="Profile" component={ProfileScreen} />
    </RecipesStack.Navigator>
  );
}

// Foods stack
function FoodsStackScreen() {
  return (
    <FoodsStack.Navigator screenOptions={{ headerShown: false }}>
      <FoodsStack.Screen name="FoodsMain" component={FoodsScreen} />
      <FoodsStack.Screen name="Profile" component={ProfileScreen} />
    </FoodsStack.Navigator>
  );
}

// Tracker stack
function TrackerStackScreen() {
  return (
    <TrackerStack.Navigator screenOptions={{ headerShown: false }}>
      <TrackerStack.Screen name="TrackerMain" component={TrackerScreen} />
      <TrackerStack.Screen name="Profile" component={ProfileScreen} />
    </TrackerStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#009688",
        tabBarInactiveTintColor: "#90a4ae",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingVertical: 8,
          height: 70,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={28}
                color={color}
              />
            );
          } else if (route.name === "Recipes") {
            return (
              <MaterialCommunityIcons
                name={focused ? "chef-hat" : "chef-hat"}
                size={28}
                color={color}
              />
            );
          } else if (route.name === "Foods") {
            return (
              <MaterialCommunityIcons
                name={focused ? "database" : "database-outline"}
                size={28}
                color={color}
              />
            );
          } else if (route.name === "Tracker") {
            return (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart"}
                size={28}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Recipes" component={RecipesStackScreen} />
      <Tab.Screen name="Foods" component={FoodsStackScreen} />
      <Tab.Screen name="Tracker" component={TrackerStackScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
