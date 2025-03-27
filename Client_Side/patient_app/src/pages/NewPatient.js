import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function NewPatientScreen() {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Retrieve email from authentication context
    const userEmail = auth.token.Email_Address; // Get email from auth context

    if (!userEmail) {
      setError("User email is not available.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.112:8000/updatePassword",
        {
          Email_Address: userEmail,
          newPassword: newPassword,
        },
        { withCredentials: true }
      );

      console.log("Server response:", response.data);

      if (response.data.status === "200 OK") {
        Alert.alert("Success", "Password updated successfully.");
        navigation.navigate("Login");
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Create New Password</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity onPress={handlePasswordUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#407BFF",
  },
  input: {
    width: "90%",
    padding: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#F1F4FF",
  },
  button: {
    width: "90%",
    padding: 12,
    backgroundColor: "#407BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});
