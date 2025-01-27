// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "./src/context/Auth";
import LoginScreen from "./src/pages/LoginScreen";
import HomeScreen from "./src/pages/HomeScreen";

const Stack = createNativeStackNavigator();

// commented out option for headerShown and gestureEnabled. For now, we will keep the header shown and the gesture enabled.
// in case of styling issues, we can uncomment and set the values to false.
export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={{
            //   headerShown: false,
            //   gestureEnabled: false,
            // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth>
  );
}
