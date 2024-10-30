import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [Pill, setPill] = useState("poop");
  return (
    <View style={styles.container}>
      <Text>Pill Name</Text>
      <Text>{Pill}</Text>
      <StatusBar style="auto" />
      <Button title ="Log"></Button>
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
