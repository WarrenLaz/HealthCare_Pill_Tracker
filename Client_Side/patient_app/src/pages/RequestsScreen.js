import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Pressable, View } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RequestsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texts}>this is requests page</Text>
      <Text style={styles.texts}>Change me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "centear",
  },
  texts: {
    color: "#3A3A3B",
    fontFamily: "inter-black",
    marginBottom: 20,
    fontSize: 30,
  },
});
