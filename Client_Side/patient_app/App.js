import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [date, setdate] = useState({});
  let log = new Date();

  async function sendLog(e) {
    setdate(log);
    console.log(String(date));
    try {
      const response = await axios.post("http://141.215.202.56:8080/Log", {date}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data); // Should log the success message from the server
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Log Pill</Text>
      <StatusBar style="auto" />
      <Button title ="Log" onPress={sendLog}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
