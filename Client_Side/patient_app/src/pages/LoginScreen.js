import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function LoginScreen() {
  const { setAuth } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = useState("wjlaz@umich.edu");
  const [password, setPassword] = useState("s!r*_.gRsG7w");
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Attempting to log in with:", username, password);
      const response = await axios.post(
        "http://141.215.213.8:8000/patientLogin", //ip for school server; anywhere else change to local host OR ip of server
        //ipconfig getifaddr en0 for mac to get ip address
        {
          LoginForm: { Username: username, Password: password },
        },
        { withCredentials: true }
      );

      console.log("Server response:", response.data);

      if (response.data.status === "200 OK") {
        setAuth({ token: response.data.packet });
        console.log("Login successful, navigating to Home");
        navigation.navigate("HomeTabs");
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
    <ImageBackground
      source={require("../../assets/background.png")} // Ensure you have the image in the correct path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
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
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.message}>Don't have an account?</Text>
        <Text style={styles.message}>Ask your doctor about ReplenX</Text>
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
  message: {
    color: "#ADB7BD",
    textAlign: "center",
    marginTop: 2,
  },
  forgotPassword: {
    fontWeight: "bold",
    color: "#407BFF",
  },
});
