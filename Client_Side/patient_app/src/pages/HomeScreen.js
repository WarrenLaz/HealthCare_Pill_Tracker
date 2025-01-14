import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  let log = new Date();
  const [date, setDate] = useState({ log });

  async function sendLog() {
    setDate({ log });
    console.log(String(date));
    try {
      const response = await axios.post("http://localhost:8000/Logs", { date }, {
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
      <Text style={styles.texts}>Vitamin D</Text>
      <StatusBar style="auto" />
      <Pressable style={styles.takebutton} onPress={sendLog}>
        <Icon name="check" size={50} color="#fff" />
      </Pressable>
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
  takebutton: {
    backgroundColor: '#407BFF',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts: {
    color: '#3A3A3B',
    fontFamily: 'inter-black',
    marginBottom: 20,
    fontSize: 30,
  }
});