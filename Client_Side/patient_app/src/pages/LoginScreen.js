import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function LoginScreen() {
  const { setAuth } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const handleLogin = async () => {
    try {
      console.log("Attempting to log in with:", username, password);
      const response = await axios.post(
        "http://localhost:8000/patientLogin",
        {
          LoginForm: { Username: username, Password: password },
        },
        { withCredentials: true }
      );

      console.log("Server response:", response.data);

      if (response.data.status === "200 OK") {
        setAuth({ token: response.data.packet });
        console.log("Login successful, navigating to Home");
        navigation.navigate("Home");
      } else {
        console.warn("Login failed with status:", response.data.status);
        setError(response.data.status);
      }
    } catch (error) {
      console.error("Login failed due to an error:", error.message);
      setError("Login failed, please try again.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to ReplenX</Text>
      <Text style={styles.subHeader}>Login</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={[
          styles.input,
          { borderColor: focusedInput === "username" ? "#407BFF" : "#ddd" },
        ]}
        placeholder="Email Address"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
        }}
        keyboardType="email-address"
        onFocus={() => setFocusedInput("username")}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor: focusedInput === "password" ? "#407BFF" : "#ddd" },
        ]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry
        onFocus={() => setFocusedInput("password")}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Navigating to Register screen");
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.link}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#407BFF",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 50,
  },
  input: {
    width: "90%",
    padding: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    width: "90%",
    padding: 12,
    backgroundColor: "#407BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
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
  link: {
    color: "#407BFF",
    textAlign: "center",
    marginTop: 15,
  },
});