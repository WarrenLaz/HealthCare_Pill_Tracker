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
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Information</Text>
        <Text style={styles.infoHeader}>First Name</Text>
        <TextInput style={styles.input}>John</TextInput>
        <Text style={styles.infoHeader}>Last Name</Text>
        <TextInput style={styles.input}>Doe</TextInput>
        <Text style={styles.infoHeader}>Email</Text>
        <TextInput style={styles.input}>johndoe@gmail.com</TextInput>
        <Text style={styles.infoHeader}>Phone Number</Text>
        <TextInput style={styles.input} value="000-000-000" editable={false} />
      </View>

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
    marginTop: 120,
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
  infoHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8.5,
    color: "#3A3A3B",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fcfcfc",
    color: "black",
    opacity: 0.5,
  },
});
