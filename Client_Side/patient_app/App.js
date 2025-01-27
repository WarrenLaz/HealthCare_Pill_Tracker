import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Auth } from "./src/context/Auth";
import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MedsScreen from "./src/pages/MedsScreen";
import RequestsScreen from "./src/pages/RequestsScreen";
import ProfileScreen from "./src/pages/ProfileScreen";

// Create stack and bottom tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs for Home Navigation
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Meds") {
            iconName = focused ? "medkit" : "medkit-outline";
          } else if (route.name === "Requests") {
            iconName = focused ? "file-tray" : "file-tray-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#407BFF", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meds" component={MedsScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth>
  );
}
