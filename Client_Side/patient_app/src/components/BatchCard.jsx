import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BatchCard = ({ date, items, status }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Sent: {date}</Text>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Items: {items.join(", ")}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Status: {status}</Text>
    </View>
  </View>
);

export default BatchCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3A3A3B",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    opacity: 0.85,
  },
  infoText: {
    marginLeft: 8,
    color: "#3A3A3B",
    fontSize: 16,
    opacity: 0.85,
  },
});
