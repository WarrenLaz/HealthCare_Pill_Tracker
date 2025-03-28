import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Auth } from "./src/context/Auth";
import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import MedsScreen from "./src/pages/MedsScreen";
import RequestsScreen from "./src/pages/RequestsScreen";
import ProfileScreen from "./src/pages/ProfileScreen";
import CustomHeader from "./src/components/ProfileHeader";
import NewPatientScreen from "./src/pages/NewPatient";

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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Meds"
        component={MedsScreen}
        options={{
          header: () => (
            <CustomHeader
              title="My Medications"
              subtitle="View all medications currently prescribed to you."
            />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          header: () => (
            <CustomHeader
              title="Batch Requests"
              subtitle="Stay up-to-date with your batch requests."
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => (
            <CustomHeader
              title="My Profile"
              subtitle="Contact your healthcare provider to make any changes."
            />
          ),
        }}
      />
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
          <Stack.Screen name="NewPatient" component={NewPatientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth>
  );
}
