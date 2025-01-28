import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation(); // Initialize navigation

  // Handle Logout Function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            console.log("User logged out");
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* General Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Information</Text>

        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} placeholder="Last Name" />
        <TextInput style={styles.input} placeholder="Phone Number" />
        <TextInput style={styles.input} placeholder="Email Address" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F4FF",
    padding: 20,
  },
  section: {
    padding: 10,
  },
  button: {
    width: "50%",
    padding: 12,
    backgroundColor: "#407BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 190,
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#3A3A3B",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "white",
  },
});
